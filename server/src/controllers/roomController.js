import Room from "../models/roomModel.js";
import asyncHandler from 'express-async-handler'

// @desc    Get all rooms
// route    GET /api/rooms
// @access  Private
const getRooms = asyncHandler(async (req, res) => {
    const rooms = await Room.find({});
    
    res.send(rooms);
});

// @desc    Adds a room
// route    POST /api/rooms
// @access  Private
const createRoom = asyncHandler(async (req, res) => {
    let { building, room_num, capacity, type, reserved_time_slots, reserved_dates } = req.body;

    // Convert reserved_time_slots and reserved_dates from strings to arrays
    reserved_time_slots = JSON.parse(reserved_time_slots);
    reserved_dates = JSON.parse(reserved_dates);
  
    const roomExists = await Room.findOne({ room_num });

    if (roomExists) {
        res.status(400);
        throw new Error('Room already exists');
    }
    
    const room = await Room.create({
        building,
        room_num,
        capacity,
        type,
        reserved_time_slots,
        reserved_dates
    });

    if (!room) {
        res.status(400);
        throw new Error('Invalid room data')
    }
    
    res.status(201).json({
        _id: room._id,
        building: room.building,
        room_num: room.room_num,
        capacity: room.capacity,
        type: room.type,
        reserved_time_slots: room.reserved_time_slots,
        reserved_dates: room.reserved_dates
    });
});



export {
    getRooms,
    createRoom
};