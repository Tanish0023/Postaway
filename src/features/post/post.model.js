import { ApplicationError } from "../../error handler/applicationError.js";

export default class postModel {
  constructor(userId, caption, imageUrl) {
    this.id = posts.length + 1;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
  }

  static getAllPosts() {
    return posts;
  }

  static getSpecificPost(id) {
    const post = posts.find((p) => p.id == id);

    if (!post) {
      throw new ApplicationError("Post not found", 404);
    } else {
      return post;
    }
  }

  static add(userId, caption, imageUrl) {
    const post = new postModel(userId, caption, imageUrl);
    posts.push(post);
  }

  static getSpecificUserPost(userId) {
    const result = posts.filter((post) => post.userId == userId);

    return result;
  }

  static delete(id, userId) {
    const index = posts.findIndex((p) => p.id == id && p.userId == userId);

    if (index >= 0) {
      posts.splice(index, 1);
    } else if (id >= 0 && id < posts.length) {
      throw new ApplicationError("You are authorized to delete this post", 400);
    } else {
      throw new ApplicationError("Post not found", 404);
    }
  }

  static update(id, userId, caption, imageUrl) {
    const index = posts.findIndex((p) => p.id == id && p.userId == userId);

    if (index >= 0) {
      posts[index] = {
        id: id,
        userId: userId,
        caption: caption,
        imageUrl: imageUrl,
      };
    } else if (id >= 0 && id < posts.length) {
      throw new ApplicationError("You are authorized to update this post", 400);
    } else {
      throw new ApplicationError("Post not found", 404);
    }
  }

  static validPostId(postId) {
    if (postId <= posts.length && postId > 0) {
      return true;
    } else {
      throw new ApplicationError("Post not found", 404);
    }
  }
}

let posts = [
  { id: 1, userId: 2, caption: "OMG", imageUrl: "images/1.jpg" },
  { id: 2, userId: 1, caption: "WOW", imageUrl: "images/2.jpg" },
];
