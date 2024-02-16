import { ApplicationError } from "../../error handler/applicationError.js";
import postModel from "../post/post.model.js";

export default class commentModel {
  constructor(userId, postId, content) {
    this.id = comments.length + 1;
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }

  static add(userId, postId, content) {
    if (postModel.validPostId(postId)) {
      const comment = new commentModel(userId, postId, content);

      comments.push(comment);
      return true;
    } else {
      return false;
    }
  }

  static get(postId) {
    postModel.validPostId(postId);
    const postComments = comments.filter((comment) => comment.postId == postId);

    return postComments;
  }

  static delete(userId, commentId) {
    const index = comments.findIndex(
      (comment) => comment.id == commentId && comment.userId == userId
    );

    if (index >= 0) {
      comments.splice(index, 1);
    } else if (commentId >= 0 && commentId < comments.length) {
      throw new ApplicationError(
        "You are not authorized to delete this comment",
        400
      );
    } else {
      throw new ApplicationError("Comment not found", 404);
    }
  }

  static update(userId, commentId, content) {
    const index = comments.findIndex(
      (comment) => comment.id == commentId && comment.userId == userId
    );

    if (index >= 0) {
      comments[index] = {
        id: Number(commentId),
        userId: userId,
        postId: comments[index].postId,
        content: content,
      };
    } else if (commentId >= 0 && commentId < comments.length) {
      throw new ApplicationError(
        "You are not authorized to update this comment",
        400
      );
    } else {
      throw new ApplicationError("Comment not found", 404);
    }
  }
}

let comments = [
  { id: 1, userId: 10, postId: 2, content: "Wonderful" },
  { id: 2, userId: 1, postId: 1, content: "My post" },
  { id: 3, userId: 2, postId: 2, content: "Beautiful" },
  { id: 4, userId: 1, postId: 2, content: "Yoo" },
];
