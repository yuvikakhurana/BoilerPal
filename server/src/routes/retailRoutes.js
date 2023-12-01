import express from "express";
import { deleteRetailReview, editRetailReview, getRetailReviews, postRetailReviews } from "../controllers/retailController.js";
const retailRoutes = express.Router();

retailRoutes.get("/", getRetailReviews);
retailRoutes.post("/post", postRetailReviews);
retailRoutes.delete("/:id/delete", deleteRetailReview);
retailRoutes.put("/:id/edit", editRetailReview);
export default retailRoutes;
