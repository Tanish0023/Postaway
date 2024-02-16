import postModel from "./post.model.js";

export default class postController {
  getAll(req, res) {
    const posts = postModel.getAllPosts();

    res.status(200).json(posts);
  }

  getSpePost(req, res) {
    const id = req.params.id;

    const post = postModel.getSpecificPost(id);
    res.status(200).json(post);
  }

  addPost(req, res) {
    const imageUrl = "images/" + req.file.filename;

    const token = req.get("Authorization");
    let parts = token.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userID;

    postModel.add(userId, req.body.caption, imageUrl);

    res.status(402).send("Post Addeed successfully!!");
  }

  specificUserPost(req, res) {
    const token = req.get("Authorization");
    let parts = token.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userID;

    const posts = postModel.getSpecificUserPost(userId);

    res.status(200).json(posts);
  }

  deletePost(req, res) {
    const token = req.get("Authorization");
    let parts = token.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userID;

    const id = req.params.id;

    postModel.delete(id, userId);
    res.status(200).send("Post deleted successfully!!");
  }

  updatePost(req, res) {
    const caption = req.body.caption;
    const imageUrl = req.body.imageUrl;

    const token = req.get("Authorization");
    let parts = token.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userID;

    const id = req.params.id;

    postModel.update(id, userId, caption, imageUrl);

    res.status(200).send("Post updated successfully!!");
  }
}
