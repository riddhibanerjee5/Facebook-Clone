import Post from "../models/Post.js";
import User from "../models/User.js";

// Create
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        });
        await newPost.save(); // save post in MongoDB

        const post = await Post.find(); // get all posts
        res.status(201).json(post); // return all posts to frontend
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}


// Read
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find(); // get all posts
        res.status(200).json(post); // return all posts to frontend
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId }); // get user's posts
        res.status(200).json(post); // return user's posts to frontend
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}


// Update
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;  // from query string
        const { userId } = req.body;    // from body of request
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId); // check if userId exists in likes

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);  // update frontend
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}