import express from "express";
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getLinkTokenAndVerify,
    sendForgotPasswordLink,
    verifyForgotPasswordLink,
    setNewPassword
} from "../controllers/userController.js";
import { protect } from '../middleware/apiProtectionMiddleware.js';

// Initialize router
const userRoutes = express.Router();

// Different routes
// IMPORTANT: Add protect to second arguement to protect api endpoint (User must be logged in)
userRoutes.post('/', registerUser);
userRoutes.post('/auth', authUser);
userRoutes.post('/logout', protect, logoutUser);
userRoutes.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
userRoutes.get('/verify/:id/:token', getLinkTokenAndVerify);
userRoutes.post('/password-reset', sendForgotPasswordLink);
userRoutes.route('/password-reset/:id/:token').get(verifyForgotPasswordLink).post(setNewPassword);

export default userRoutes;