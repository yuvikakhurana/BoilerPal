import asyncHandler from 'express-async-handler'
import crypto from 'crypto';
import generateJWT from '../utils/generateJWT.js'
import User from '../models/userModel.js';
import Token from '../models/verificationToken.js'
import sendEmail from '../utils/sendEmail.js'
import verificationToken from '../models/verificationToken.js';
import Room from "../models/roomModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    let verifyToken;

    if (user && (await user.matchPassword(password))) {
        generateJWT(res, user._id);
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    if (!user.verified) {
        verifyToken = await Token.findOne({ userId: user._id });
			if (!verifyToken) {
				verifyToken = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
				const url = `${process.env.BASE_URL}verify/${user.id}/${verifyToken.token}`;
				await sendEmail(user.email, "Verify Email", url);
			}
        res.status(400).send({ message: "An Email sent to your account please verify" });
    }
    res.status(200);
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        verified: user.verified
    });
  });

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    
    const user = await User.create({
        name,
        email,
        password
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid user data')
    }
    let verifyToken;
    // Sending email verification link
    if (!user.verified) {
        verifyToken = await Token.findOne({ userId: user._id });
			if (!verifyToken) {
				verifyToken = await new Token({
					userId: user._id,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
				const url = `${process.env.BASE_URL}verify/${user.id}/${verifyToken.token}`;
				await sendEmail(user.email, "Verify Email", url);
			}
        res.status(400).send({ message: "An Email sent to your account please verify" });
    }
    
    // Creating JWT and returning newly created user info
    generateJWT(res, user._id);
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        verified: user.verified
    });
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    
    res.status(200).json({ message: 'User logged out' });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user);
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
   
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.verified = true;
        
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Verifies account once user clicks on verify link
// route    GET /api/users/:id/:token
// @access  Public
const getLinkTokenAndVerify = asyncHandler(async (req, res) => {
    const user = await User.findOne({ _id: req.params.id });
    
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    user.verified = true;
    user.save();
    console.log(user.verified);
    await token.deleteOne();

    res.status(200).send({ message: "Email verified successfully" });
});

// @desc    Send forgot password link to email
// route    POST /api/users/password-reset
// @access  Public
const sendForgotPasswordLink = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(400);
        throw new Error('User with given email does not exist!');
    }
    
    let token = await Token.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		const url = `${process.env.BASE_URL}resetPassword/${user.id}/${token.token}/`;
		try {
            const sent = await sendEmail(user.email, "Password Reset", url);
        } catch (error) {
            res.status(500);
            throw new Error('Internal server error');
        }

        res.status(200).json({ message: "Password reset link sent to your email account" });
});

// @desc    Verify that password link is valid
// route    GET /api/users/password-reset/:id/:token
// @access  Public
const verifyForgotPasswordLink = asyncHandler(async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
        console.log(user);
		if (!user) {
            res.status(400);
            throw new Error('Invalid link1');
        }

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) {
            res.status(400);
            throw new Error('Invalid link2');
        }

		res.status(200).json({ message: "Valid link" });
	} catch (error) {
        res.status(500);
        throw new Error('Invalid link3');
	}
});

// @desc    Change password from forgot password link
// route    POST /api/users/password-reset/:id/:token
// @access  Public
const setNewPassword = asyncHandler(async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user){
            res.status(400);
            throw new Error('Invalid link');
        }
        
		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token){
            res.status(400);
            throw new Error('Invalid link');
        }

		if (!user.verified) {
            user.verified = true;
        }
        
        if (req.body.password) {
            user.password = req.body.password;
        } else {
            res.status(400);
            throw new Error('Invalid input');
        }

        const updatedUser = await user.save();
        await token.deleteOne();

		res.status(200).json({ message: "Password reset successfully" });
	} catch (error) {
        res.status(500);
        throw new Error('Invalid link');
	}
});

// @desc    Create a new reservation
// route    POST /api/users/reservation
// @access  Private
const createReservation = asyncHandler(async (req, res) => {
    // Add to user
    const user = await User.findById(req.user._id);
    if (!user) {
       res.status(400);
       throw new Error('User doesnt exist');
    }
    const {date, time_slot, building, room_num} = req.body;
   
    if (date && time_slot && building && room_num) {
       // Check if reservation already exists
       let isReservationExists = user.reservations.some(reservation => 
         reservation.date === date && 
         reservation.time_slot === time_slot && 
         reservation.building === building && 
         reservation.room_num === room_num
       );
   
       if (isReservationExists) {
           res.status(400);
           throw new Error('Reservation already exists');
       }
   
       await sendEmail(user.email, "New Reservation!", "Hi, you have reserved a room!");

       let newReservation = {
           date: date,
           time_slot: time_slot,
           building: building,
           room_num: room_num
       };
       user.reservations.push(newReservation);
       await user.save();
   
       // Add to room
       let room = await Room.findOne({ room_num: room_num });
       if (room) {
           // Check if date and time_slot are already reserved
           let isDateReserved = room.reserved_dates.some(reservedDate => reservedDate.date === date);
           let isTimeSlotReserved = room.reserved_time_slots.some(reservedTime => reservedTime.time === time_slot);
   
           if (isDateReserved || isTimeSlotReserved) {
               res.status(400);
               throw new Error('Date and time are already reserved');
           }
   
           room.reserved_dates.push({ date: date });
           room.reserved_time_slots.push({ time: time_slot });
           await room.save();
       } else {
           res.status(404);
           throw new Error('Room not found');
       }
   
       res.send('Reservation added successfully');
    } else {
       res.status(404);
       throw new Error('Reservation not found');
    }
});

// @desc    Delete a new reservation
// route    DELETE /api/users/reservation
// @access  Private
const deleteReservation = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400);
      throw new Error('User doesnt exist');
    }
    const {room_num} = req.body;
   
    if (room_num) {
        let reservation = user.reservations.find(reservation => 
            reservation.room_num === room_num
    );
      if (reservation) {
        let index = user.reservations.indexOf(reservation);
        user.reservations.splice(index, 1);
        await user.save();
      } else {
        res.status(404);
        throw new Error('Reservation not found');
      }
   
      let room = await Room.findOne({ room_num: room_num });
      if (room) {
        room.reserved_dates = room.reserved_dates.filter(reservedDate => reservedDate.date !== reservation.date);
        room.reserved_time_slots = room.reserved_time_slots.filter(reservedTime => reservedTime.time !== reservation.time_slot);
        await room.save();
      } else {
        res.status(404);
        throw new Error('Room not found');
      }
   
      res.send('Reservation deleted successfully');
    } else {
      res.status(404);
      throw new Error('Reservation not found');
    }
});

// @desc    Get all reservations
// route    GET /api/users/reservation
// @access  Private
const getReservations = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
     res.status(400);
     throw new Error('User doesnt exist');
    }
    res.status(200).json(user.reservations);
   });
   
// @desc    Create a new class
// route    POST /api/users/class
// @access  Private
const createClass = asyncHandler(async (req, res) => {
    // Add to user
    const user = await User.findById(req.user._id);
    if (!user) {
       res.status(400);
       throw new Error('User doesnt exist');
    }
    let {name, date, time_slot, by_weekday, location} = req.body;
    
    // Convert reccuring_days from strings to arrays
    by_weekday = JSON.parse(by_weekday);

    if (name && date && time_slot && by_weekday && location) {
       // Check if Class already exists
       let isClassExists = user.classes.some(class_v => 
            class_v.name === name && 
            class_v.date === date && 
            class_v.time_slot === time_slot && 
            class_v.location === location
       );
       
       if (isClassExists) {
           res.status(400);
           throw new Error('Class already exists');
       }
   
       let newClass = {
            name: name,
            date: date,
            time_slot: time_slot,
            by_weekday: by_weekday,
            location: location
       };
       user.classes.push(newClass);
       await user.save();

       res.send('Class added successfully');
    } else {
       res.status(404);
       throw new Error('Class not found');
    }
});

// @desc    Delete a class
// route    DELETE /api/users/class
// @access  Private
const deleteClass = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
     res.status(400);
     throw new Error('User doesnt exist');
    }
    const {name} = req.body;
   
    if (name) {
     let classIndex = user.classes.findIndex(cls => cls.name === name);
   
     if (classIndex !== -1) {
      user.classes.splice(classIndex, 1);
      await user.save();
      res.send('Class deleted successfully');
     } else {
      res.status(404);
      throw new Error('Class not found');
     }
    } else {
     res.status(404);
     throw new Error('User not found');
    }
});

// @desc    Edit a class
// route    PUT /api/users/class
// @access  Private
const editClass = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
     res.status(400);
     throw new Error('User doesnt exist');
    }
    const {name} = req.body;
   
    if (name) {
     let classIndex = user.classes.findIndex(cls => cls.name === name);
   
     if (classIndex !== -1) {
      user.classes[classIndex].name = req.body.new_name || user.classes[classIndex].name;
      user.classes[classIndex].date = req.body.date || user.classes[classIndex].date;
      user.classes[classIndex].time_slot = req.body.time_slot || user.classes[classIndex].time_slot;
      user.classes[classIndex].by_weekday = req.body.by_weekday || user.classes[classIndex].by_weekday;
      user.classes[classIndex].location = req.body.location || user.classes[classIndex].location;
      await user.save();
      res.send('Class updated successfully');
     } else {
      res.status(404);
      throw new Error('Class not found');
     }
    } else {
     res.status(404);
     throw new Error('User not found');
    }
});

// @desc    Get all classes
// route    GET /api/users/class
// @access  Private
const getClasses = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
     res.status(400);
     throw new Error('User doesnt exist');
    }
    res.status(200).json(user.classes);
   });
   
// @desc    Create a new event
// route    POST /api/users/event
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
    //const user = await User.findById(req.user._id);
    /*if (!user) {
       res.status(400);
       throw new Error('User doesnt exist');
    }*/
    // if (!user) {
    //     user = await User.findById('65667e2dc254ce1bba4dd692');
    // }
    // Check if req has field _id

    let user = await User.findById('65667e2dc254ce1bba4dd692');
    if (req.body._id) {
        user = await User.findById(req.body._id);
    }

    let {name, date, time_slot, } = req.body;
    
    if (name && date && time_slot) {
       // Check if Class already exists
       let isEventsExists = user.events.some(event => 
            event.name === name && 
            event.date === date && 
            event.time_slot === time_slot
       );
       
       if (isEventsExists) {
           res.status(400);
           throw new Error('Event already exists');
       }
   
       let newEvent = {
            name: name,
            date: date,
            time_slot: time_slot
       };
       user.events.push(newEvent);
       await user.save();

       res.send('Event added successfully');
    } else {
       res.status(404);
       throw new Error('Event not found');
    }
});

// @desc    Delete a event
// route    DELETE /api/users/event
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
    // const user = await User.findById(req.user._id);
    // /*if (!user) {
    //  res.status(400);
    //  throw new Error('User doesnt exist');
    // }*/
    // if (!user) {
    //     user = await User.findById('65667e2dc254ce1bba4dd692');
    // }
    // console.log(user.name);

    let user = await User.findById('65667e2dc254ce1bba4dd692');
    if (req.body._id) {
        user = await User.findById(req.body._id);
    }
    const {name} = req.body;
    console.log(name);
   
    if (name) {
     let eventIndex = user.events.findIndex(evt => evt.name === name);
   
     if (eventIndex !== -1) {
      user.events.splice(eventIndex, 1);
      await user.save();
      res.send('Event deleted successfully');
     } else {
      res.status(404);
      throw new Error('Event not found');
     }
    } else {
     res.status(404);
     throw new Error('User not found');
    }
});

// @desc    Edit a event
// route    PUT /api/users/event
// @access  Private
const editEvent = asyncHandler(async (req, res) => {
    // const user = await User.findById(req.user._id);
    /*if (!user) {
     res.status(400);
     throw new Error('User doesnt exist');
    }*/
    let user = await User.findById('65667e2dc254ce1bba4dd692');
    if (req.body._id) {
        user = await User.findById(req.body._id);
    }

    const {name} = req.body;
   
    if (name) {
     let eventIndex = user.events.findIndex(evt => evt.name === name);
   
     if (eventIndex !== -1) {
      user.events[eventIndex].name = req.body.new_name || user.events[eventIndex].name;
      user.events[eventIndex].date = req.body.date || user.events[eventIndex].date;
      user.events[eventIndex].time_slot = req.body.time_slot || user.events[eventIndex].time_slot;
      await user.save();
      res.send('Event updated successfully');
     } else {
      res.status(404);
      throw new Error('Event not found');
     }
    } else {
     res.status(404);
     throw new Error('Event not found');
    }
});

// @desc    Get all events
// route    GET /api/users/event
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    /*if (!user) {
     res.status(400);
     throw new Error('User doesnt exist');
    }*/
    if (!user) {
        user = await User.findById('65667e2dc254ce1bba4dd692');
    }
    res.status(200).json(user.events);
});

// @desc    Get all calender items
// route    GET /api/users/items
// @access  Private
const getAllItems = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
     res.status(400);
     throw new Error('User doesnt exist');
    }
    res.status(200).json({
     events: user.events,
     classes: user.classes,
     reservations: user.reservations
    });
});

// @desc    Create a new todo
// route    POST /api/users/todo
// @access  Private
const createTodo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
       res.status(400);
       throw new Error('User doesnt exist');
    }
    let { text } = req.body;
    
    if ( text ) {
       // Check if Class already exists
       let isTodoExists = user.todos.some(todo => 
            todo.text === text
       );
       
       if (isTodoExists) {
           res.status(400);
           throw new Error('Todo already exists');
       }
   
       let newTodo = {
            text: text,
            completed: false
       };
       user.todos.push(newTodo);
       await user.save();

       res.send('Todo added successfully');
    } else {
       res.status(404);
       throw new Error('Todo not found');
    }
});

// @desc    Delete a todo
// route    DELETE /api/users/todo
// @access  Private
const deleteTodo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
     res.status(400);
     throw new Error('User doesnt exist');
    }
    const {text} = req.body;
    console.log(text)
   
    if (text) {
     let todoIndex = user.todos.findIndex(tdo => tdo.text === text);
   
     if (todoIndex !== -1) {
      user.todos.splice(todoIndex, 1);
      await user.save();
      res.send('Todo deleted successfully');
     } else {
      res.status(404);
      throw new Error('Todo not found');
     }
    } else {
     res.status(404);
     throw new Error('User not found');
    }
});

// @desc    Edit a todo
// route    PUT /api/users/todo
// @access  Private
const editTodo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
     res.status(400);
     throw new Error('User doesnt exist');
    }
    const {text} = req.body;
   
    if (text) {
     let todoIndex = user.todos.findIndex(tdo => tdo.text === text);
   
     if (todoIndex !== -1) {
      user.todos[todoIndex].text = req.body.new_text || user.todos[todoIndex].text;
      user.todos[todoIndex].completed = req.body.completed || user.todos[todoIndex].completed;
      await user.save();
      res.send('Todo updated successfully');
     } else {
      res.status(404);
      throw new Error('Todo not found');
     }
    } else {
     res.status(404);
     throw new Error('User not found');
    }
});

// @desc    Get all todos
// route    GET /api/users/todo
// @access  Private
const getTodos = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
     res.status(400);
     throw new Error('User doesnt exist');
    }
    res.status(200).json(user.todos);
});
   

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getLinkTokenAndVerify,
    sendForgotPasswordLink,
    verifyForgotPasswordLink,
    setNewPassword,
    createReservation,
    deleteReservation,
    createClass,
    deleteClass,
    editClass,
    createEvent,
    deleteEvent,
    editEvent,
    getReservations,
    getClasses,
    getEvents,
    getAllItems,
    createTodo,
    deleteTodo,
    editTodo,
    getTodos
};