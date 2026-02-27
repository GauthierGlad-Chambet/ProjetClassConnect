import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId : {
            type : String,
            required : true,
            trim : true
        },
        content : {
            type : String,
            required : true,
            trim : true
        }
    },
    {
        timestamp : true
    }
);

export const Post = mongoose.model("Post", postSchema);