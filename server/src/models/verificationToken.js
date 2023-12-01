import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Creating schema
const verificationTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unqiue: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600
    }
});

const VerificationToken = mongoose.model('VerificationToken', verificationTokenSchema);

export default VerificationToken;