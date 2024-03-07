import mongoose, { Mongoose } from "mongoose";
import { postSchema } from "./post.schema.js";
import { ApplicationError } from "../../error handler/applicationError.js";
import { ObjectId } from "mongoose";
import { userSchema } from "../user/user.schema.js";
//

//
export const addPost = async (userId, caption, imageUrl) => {
  try {
    const postModel = mongoose.model("post", postSchema);
    const userModel = mongoose.model("User", userSchema);

    const user = await userModel.findById(userId);
    const post = new postModel({
      userId,
      caption,
      imageUrl,
    });

    const savedPost = await post.save();
    user.post.push(savedPost._id);
    await user.save();

    return savedPost;
  } catch (err) {
    throw new ApplicationError("Internal Server error!!", 500);
  }
};

export const deletePost = async (postId, userId) => {
  try {
    const postModel = mongoose.model("post", postSchema);
    const userModel = mongoose.model("User", userSchema);

    const post = await postModel.findOneAndDelete({
      _id: postId,
      userId: userId,
    });
    const postUserCheck = await postModel.findById(postId);

    if (postUserCheck && !post) {
      return {
        status: false,
        message: "You are not authorized to delete this post!",
        statusCode: 400,
      };
    }

    if (post) {
      const user = await userModel.findByIdAndUpdate(userId, {
        $pull: { post: postId },
      });
      await user.save();
      return {
        status: true,
        message: "Post deleted successfully!!",
        statusCode: 200,
      };
    } else {
      return {
        status: false,
        message: "Post not found!!",
        statusCode: 404,
      };
    }
  } catch (err) {
    throw new ApplicationError("Internal Server error!!", 500);
  }
};

export const updatePost = async (postId, userId, caption, imageUrl) => {
  try {
    const postModel = mongoose.model("post", postSchema);

    const post = await postModel.findOne({ _id: postId, userId: userId });

    const postUserCheck = await postModel.findById(postId);

    if (postUserCheck && !post) {
      return {
        status: false,
        message: "You are not authorized to update this post!",
        statusCode: 400,
      };
    }

    if (!post) {
      return {
        status: false,
        message: "Post not found!!",
        statusCode: 404,
      };
    }

    post.caption = caption;
    post.imageUrl = imageUrl;
    await post.save();

    return {
      status: true,
      message: post,
      statusCode: 200,
    };
  } catch (err) {
    throw new ApplicationError("Internal Server error!!", 500);
  }
};

export const getUserPost = async (userId) => {
  const postModel = mongoose.model("post", postSchema);

  const userPosts = await postModel.find({
    userId: userId,
  });

  return userPosts;
};

export const getPost = async (postId) => {
  const postModel = mongoose.model("post", postSchema);

  const post = await postModel.findById(postId);

  if (post) {
    return {
      status: true,
      message: post,
      statusCode: 200,
    };
  } else {
    return {
      status: false,
      message: "Post not found!!!",
      statusCode: 404,
    };
  }
};

export const getAllPost = async () => {
  const postModel = mongoose.model("post", postSchema);

  const posts = await postModel.find();

  return posts;
};
