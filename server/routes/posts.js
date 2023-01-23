import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read
router.get("/", verifyToken, getFeedPosts);     // all posts in feed
router.get("/:userId/posts", verifyToken, getUserPosts);    // only user's posts


// Update
router.patch("/:id/like", verifyToken, likePost);   // liking and unliking post

export default router;