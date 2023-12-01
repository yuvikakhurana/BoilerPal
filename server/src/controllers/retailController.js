import Retail from "../models/retail.js";

export const getRetailReviews = async (req, res) => {
  try {
    //grabbing all the reviews
    const all_reviews = await Retail.find();
    res.status(200).json(all_reviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const postRetailReviews = async (req, res) => {
  try {
    //console.log("request.body");
    //console.log(req.body);
    const { username, content, rating, location } = req.body;
    //const review = await User.findby(userId);
    const newReview = new Retail({
      username: username,
      content: content,
      rating: rating,
      location: location,
    });

    await newReview.save();
    //saving the post

    //grabbing all the posts
    const reviews = await Retail.find();

    //201 represents created something ; 200 is a successful request
    res.status(201).json(reviews);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const deleteRetailReview = async (req, res) => {
  try {
    const reviewId = req.params.id; // Extract the review ID from the request parameters

    // Perform validation and authorization checks as needed

    // Delete the review from the database
    await Retail.findByIdAndRemove(reviewId);

    res.status(204).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Failed to delete the review" });
  }
};

export const editRetailReview = async (req, res) => {
  try {
    const reviewId = req.params.id; // Extract the review ID from the request parameters
    const { content, rating } = req.body; // Extract updated content and rating from the request body
    // console.log(reviewId);
    // console.log(content);
    // console.log(rating);
    // Perform validation and authorization checks as needed

    // Find the review by ID and update it
    const updatedReview = await Retail.findByIdAndUpdate(
      reviewId,
      { $set: { content: content, rating: rating } },
      { new: true } // Return the updated document
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(updatedReview);
  } catch (error) {
    console.error("Error editing review:", error);
    res.status(500).json({ error: "Failed to edit the review" });
  }
};
