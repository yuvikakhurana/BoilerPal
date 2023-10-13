import asyncHandler from 'express-async-handler'
import crypto from 'crypto';
import generateJWT from '../utils/generateJWT.js'
import User from '../models/userModel.js';
import Token from '../models/verificationToken.js'
import sendEmail from '../utils/sendEmail.js'
import verificationToken from '../models/verificationToken.js';

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
        
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        });
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

		const url = `${process.env.BASE_URL}users/password-reset/${user.id}/${token.token}/`;
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
        
		if (!user) {
            res.status(400);
            throw new Error('Invalid link');
        }

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) {
            res.status(400);
            throw new Error('Invalid link');
        }

		res.status(200).json({ message: "Valid link" });
	} catch (error) {
        res.status(500);
        throw new Error('Invalid link');
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

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getLinkTokenAndVerify,
    sendForgotPasswordLink,
    verifyForgotPasswordLink,
    setNewPassword
};