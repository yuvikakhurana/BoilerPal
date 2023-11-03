import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    building: String,
    room_num: String,
    capacity: Number,
    type: String,
    reserved_time_slots: [{ time: String }],
    reserved_dates: [{ date: String }]
});

const Room = mongoose.model('Room', roomSchema);

export default Room;