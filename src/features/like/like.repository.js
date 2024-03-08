import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { postSchema } from "../post/post.schema.js";
import { commentScheme } from "../comment/comment.schema.js";
import { ApplicationError } from "../../error handler/applicationError.js";

export const getLikes = async (id) => {
  const likeModel = mongoose.model("Like", likeSchema);

  const like = await likeModel.find({ likeable: id });

  if (like.length === 0) {
    return { status: false, message: "Like not found", statusCode: 404 };
  } else {
    return { status: true, message: like, statusCode: 200 };
  }
};

export const toggleLike = async (userId, id, type) => {
  try {
    const likeModel = mongoose.model("Like", likeSchema);
    const postModel = mongoose.model("Post", postSchema);
    const commentModel = mongoose.model("Comment", commentScheme);

    //Checking provided Id
    const post = await postModel.findById(id);
    const comment = await commentModel.findById(id);

    if (!post && !comment) {
      return {
        status: false,
        message: "No comment or post found for the provided id",
        statusCode: 404,
      };
    }

    // Checking if like alresy exist or not
    const likeAlreadyExist = await likeModel.findOneAndDelete({
      userId: userId,
      likeable: id,
    });

    if (likeAlreadyExist) {
      const likeId = likeAlreadyExist._id;

      if (post) {
        const postRemove = await postModel.findByIdAndUpdate(id, {
          $pull: { likes: likeId },
        });

        await postRemove.save();
        return {
          status: true,
          added: false,
          message: "Like removed from post",
          statusCode: 200,
        };
      } else if (comment) {
        const commentRemove = await commentModel.findByIdAndUpdate(id, {
          $pull: { likes: likeId },
        });

        await commentRemove.save();
        return {
          status: true,
          added: false,
          message: "Like removed from comment",
          statusCode: 200,
        };
      }
    } else {
      const like = new likeModel({
        userId: userId,
        likeable: id,
        on_model: type,
      });
      const savedLike = await like.save();

      if (post) {
        post.likes.push(savedLike._id);
        await post.save();
      } else if (comment) {
        comment.likes.push(savedLike._id);
        await comment.save();
      }

      return { status: true, added: true, message: savedLike, statusCode: 202 };
    }
  } catch (err) {
    throw new ApplicationError("Internal server error", 500);
  }
};
