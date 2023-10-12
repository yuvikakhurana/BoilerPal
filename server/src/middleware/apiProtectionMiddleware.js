import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
    
    // Getting JWT from potentially logged in user
    let token;
    token = req.cookies.jwt;

    if (token) {

        // If there is a token, we verify and set the user to the current one
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password');
            
            next();
        } catch {
            res.status(401);
            throw new Error('Not authorized, invalid token')
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token')
    }
});

export { protect };
