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
    getTodos,
    toggleReminder,
    getReminder
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
userRoutes.post('/class', createClass);
userRoutes.delete('/class', deleteClass);
userRoutes.put('/class', editClass);
userRoutes.get('/event', protect, getEvents);
userRoutes.post('/event', createEvent);
userRoutes.delete('/event', deleteEvent);
userRoutes.put('/event', editEvent);
userRoutes.get('/item', protect, getAllItems);
userRoutes.post('/todo', protect, createTodo);
userRoutes.delete('/todo', protect, deleteTodo);
userRoutes.put('/todo', protect, editTodo);
userRoutes.get('/todo', protect, getTodos);
userRoutes.post('/reminder', protect, toggleReminder);
userRoutes.get('/reminder', protect, getReminder);

export default userRoutes;