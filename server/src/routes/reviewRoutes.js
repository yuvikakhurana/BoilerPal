import express from "express";
import { deleteReview, editReview, getReviews, postReviews } from "../controllers/reviewController.js";
const reviewRoutes = express.Router();

reviewRoutes.get("/", getReviews);
reviewRoutes.post("/post", postReviews);
reviewRoutes.delete("/:id/delete", deleteReview);
reviewRoutes.put("/:id/edit", editReview);
export default reviewRoutes;
