import mongoose from "mongoose";

// Creating schema
const retailSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    location: {
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

const Retail = mongoose.model("Retail", retailSchema);

export default Retail;