import express from "express";
import { protect } from '../middleware/apiProtectionMiddleware.js';
import { createRoom, getRooms } from "../controllers/roomController.js";

// Initialize router
const roomRoutes = express.Router();

// Different routes
// IMPORTANT: Add protect to second arguement to protect api endpoint (User must be logged in)
roomRoutes.post('/', protect, createRoom);
roomRoutes.get('/', protect, getRooms)

export default roomRoutes;