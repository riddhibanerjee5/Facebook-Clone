import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath: String,        // post picture   
        userPicturePath: String,    // profile picture
        likes: {
            type: Map,
            of: Boolean,    // if user exists in map, true = user liked post
        },
        comments: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;