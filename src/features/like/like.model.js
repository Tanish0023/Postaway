import { ApplicationError } from "../../error handler/applicationError.js";
import postModel from "../post/post.model.js";

export default class likeModel {
  constructor(userId, postId) {
    this.id = likes.length + 1;
    this.userId = userId;
    this.postId = Number(postId);
  }

  static getLikes(postId) {
    const specificLikesPost = likes.filter((like) => like.postId == postId);
    return specificLikesPost;
  }

  static toggle(postId, userId) {
    // console.log(postId);
    // console.log(userId);
    if (postModel.validPostId(postId)) {
      let status = true;
      likes.forEach((like) => {
        if (like.postId == postId && like.userId == userId) {
          console.log(like.id - 1);
          likes.splice(like.id - 1, 1);
          status = false;
        }
      });

      if (status) {
        const like = new likeModel(userId, postId);
        likes.push(like);
      }

      return status;
    } else {
      throw new ApplicationError("Post not found", 404);
    }
  }
}

const likes = [
  { id: 1, userId: 1, postId: 2 },
  { id: 2, userId: 2, postId: 1 },
  { id: 3, userId: 1, postId: 1 },
];
