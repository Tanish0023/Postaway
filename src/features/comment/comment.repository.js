import mongoose from "mongoose";
import { commentScheme } from "./comment.schema.js";
import { postSchema } from "../post/post.schema.js";

export const addComment = async (userId, postId, content) => {
  const commentModel = mongoose.model("Comment", commentScheme);
  const postModel = mongoose.model("Post", postSchema);

  const post = await postModel.findById(postId);
  if (!post) {
    return { status: false, message: "Post not found", statusCode: 404 };
  }

  const comment = new commentModel({ userId, postId, content });
  const savedComment = await comment.save();

  post.comments.push(savedComment._id);
  await post.save();

  return { status: true, message: savedComment, statusCode: 200 };
};

export const getComment = async (postId) => {
  const commentModel = mongoose.model("Comment", commentScheme);

  const comment = await commentModel.find({ postId: postId });

  if (comment.length != 0) {
    return { status: true, message: comment, statusCode: 200 };
  } else {
    return { status: false, message: "Comments Not found", statusCode: 404 };
  }
};

export const deleteComment = async (commentId, userId) => {
  const commentModel = mongoose.model("Comment", commentScheme);
  const postModel = mongoose.model("Post", postSchema);

  const commentDel = await commentModel.findOneAndDelete({
    _id: commentId,
    userId: userId,
  });
  const findComment = await commentModel.findById(commentId);

  if (findComment && !commentDel) {
    return {
      status: false,
      message: "You are not authorized to delete this comment",
      statusCode: 400,
    };
  }

  if (commentDel) {
    const commentIdFromPost = commentDel.postId;
    const post = await postModel.findByIdAndUpdate(commentIdFromPost, {
      $pull: { comments: commentId },
    });

    await post.save();
    return {
      status: true,
      message: "Comment deleted successfully!!",
      statusCode: 200,
    };
  } else {
    return { status: false, message: "Comment not found!!", statusCode: 400 };
  }
};

export const updateComment = async (commentId, userId, content) => {
  const commentModel = mongoose.model("Comment", commentScheme);
  const userModel = mongoose.model("User", postSchema);

  const userFind = await userModel.findById(userId);

  const checkCommentAvailable = await commentModel.findById(commentId);
  if (!checkCommentAvailable) {
    return {
      status: false,
      message: "Comment not found",
      statusCode: 404,
    };
  }

  const comment = await commentModel.find({ _id: commentId, userId: userId });
  console.log(comment);
  if (checkCommentAvailable && comment.length == 0) {
    return {
      status: false,
      message: "You are not authorized to update this comment",
      statusCode: 400,
    };
  }

  checkCommentAvailable.content = content;
  const updatedComment = await checkCommentAvailable.save();

  return { status: true, message: updatedComment, statusCode: 200 };
};
