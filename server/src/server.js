import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import connectMongo from "./config/db.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import cors from "cors";
import Reviews from "./models/reviews.js";
import roomRoutes from './routes/roomRoutes.js';
import retailRoutes from "./routes/retailRoutes.js";

/*
-> Creates Express application
-> Sets port to 5000
*/
const app = express();
const port = process.env.PORT || 5000;

/*
Middleware:
-> POST and PUT request middleware
-> Parsing coookie middleware
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Set up API route(s)
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use("/reviews", reviewRoutes);
app.use("/retail", retailRoutes);

/*
More Middleware:
-> 404 not found and error handling middleware: ADD AFTER ROUTE(S)
-> routes need to be defined for this middleware
*/
app.use(notFound);
app.use(errorHandler);

// Connects to MongoDB
connectMongo();

// Assuming everything worked, we log the enviorment and port
app.listen(port, () => {
  console.log(`Node env: ${process.env.NODE_ENV}`);
  console.log(`Server started on port ${port}`);
});
