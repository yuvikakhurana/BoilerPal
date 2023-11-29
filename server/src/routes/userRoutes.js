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
userRoutes.get('/reservation', protect, getReservations);
userRoutes.post('/reservation', protect, createReservation);
userRoutes.delete('/reservation', protect, deleteReservation);
userRoutes.get('/class', protect, getClasses);
userRoutes.post('/class', protect, createClass);
userRoutes.delete('/class', protect, deleteClass);
userRoutes.put('/class', protect, editClass);
userRoutes.get('/event', protect, getEvents);
userRoutes.post('/event', protect, createEvent);
userRoutes.delete('/event', protect, deleteEvent);
userRoutes.put('/event', protect, editEvent);
userRoutes.get('/item', protect, getAllItems);
userRoutes.post('/todo', protect, createTodo);
userRoutes.delete('/todo', protect, deleteTodo);
userRoutes.put('/todo', protect, editTodo);
userRoutes.get('/todo', protect, getTodos);


export default userRoutes;