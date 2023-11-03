import Reviews from "../models/reviews.js";

export const getReviews = async (req, res) => {
  try {
    //grabbing all the reviews
    const all_reviews = await Reviews.find();
    res.status(200).json(all_reviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const postReviews = async (req, res) => {
  try {
    //console.log("request.body");
    //console.log(req.body);
    const { username, content, rating, dining } = req.body;
    //const review = await User.findby(userId);
    const newReview = new Reviews({
      username: username,
      content: content,
      rating: rating,
      dining: dining,
    });

    await newReview.save();
    //saving the post

    //grabbing all the posts
    const reviews = await Reviews.find();

    //201 represents created something ; 200 is a successful request
    res.status(201).json(reviews);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id; // Extract the review ID from the request parameters

    // Perform validation and authorization checks as needed

    // Delete the review from the database
    await Reviews.findByIdAndRemove(reviewId);

    res.status(204).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Failed to delete the review" });
  }
};

export const editReview = async (req, res) => {
  try {
    const reviewId = req.params.id; // Extract the review ID from the request parameters
    const { content, rating } = req.body; // Extract updated content and rating from the request body
    // console.log(reviewId);
    // console.log(content);
    // console.log(rating);
    // Perform validation and authorization checks as needed

    // Find the review by ID and update it
    const updatedReview = await Reviews.findByIdAndUpdate(
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
