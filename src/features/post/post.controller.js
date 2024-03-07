import {
  addPost,
  deletePost,
  getAllPost,
  getPost,
  getUserPost,
  updatePost,
} from "./post.repository.js";

export default class postController {
  async getAll(req, res) {
    const posts = await getAllPost();
    res.status(200).json(posts);
  }

  async getSpePost(req, res) {
    const id = req.params.id;

    const result = await getPost(id);

    if (result.status) {
      res.status(result.statusCode).json(result.message);
    } else {
      res.status(result.statusCode).send(result.message);
    }
  }

  async addPost(req, res) {
    const { caption } = req.body;
    const imageUrl = "images/" + req.file.filename;

    const { jwtToken } = req.cookies;
    let parts = jwtToken.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId;

    const post = await addPost(userId, caption, imageUrl);
    res.status(402).json(post);
  }

  async specificUserPost(req, res) {
    const { jwtToken } = req.cookies;
    let parts = jwtToken.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId;

    const result = await getUserPost(userId);

    res.status(200).json(result);
  }

  async deletePost(req, res) {
    const { jwtToken } = req.cookies;
    let parts = jwtToken.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId;

    const id = req.params.id;
    const result = await deletePost(id, userId);
    if (result.status) {
      res.status(result.statusCode).send(result.message);
    } else {
      res.status(result.statusCode).send(result.message);
    }
  }

  async updatePost(req, res) {
    const { jwtToken } = req.cookies;
    let parts = jwtToken.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId;

    const imageUrl = "images/" + req.file.filename;
    const postId = req.params.id;
    const caption = req.body.caption;

    const result = await updatePost(postId, userId, caption, imageUrl);

    if (result.status) {
      res.status(result.statusCode).json(result.message);
    } else {
      res.status(result.statusCode).send(result.message);
    }
  }
}
