import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Creating schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    reservations : [{
        date: String,
        time_slot: String,
        building: String,
        room_num: String
    }],
    classes : [{
        name: String,
        date: String,
        time_slot: String,
        by_weekday: [{
            day: String
        }],
        location: String,
    }],
    events : [{
        name: String,
        date: String,
        time_slot: String,
    }],
    todos : [{
        text: String,
        completed: Boolean,
    }],
    reminder : {
        type: Boolean
    }
}, {
    timestamps: true
});

// Middleware to hash password
userSchema.pre('save', async function (next)  {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// Schema method for comparing password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;