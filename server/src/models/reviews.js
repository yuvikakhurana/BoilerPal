import mongoose from "mongoose";

// Creating schema
const reviewsSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    dining: {
        type: String, 
        required: true
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model("Reviews", reviewsSchema);

export default Reviews;
