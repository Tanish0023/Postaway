import {
  addComment,
  deleteComment,
  getComment,
  updateComment,
} from "./comment.repository.js";

export default class commentController {
  async getComment(req, res) {
    const postId = req.params.postId;

    const result = await getComment(postId);

    if (result.status) {
      res.status(result.statusCode).json(result.message);
    } else {
      res.status(result.statusCode).send(result.message);
    }
  }

  async postComment(req, res) {
    const postId = req.params.postId;
    const content = req.body.content;

    const { jwtToken } = req.cookies;
    let parts = jwtToken.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId;

    const result = await addComment(userId, postId, content);
    if (result.status) {
      res
        .status(result.statusCode)
        .json({ res: "Comment added sucessfully!!", comment: result.message });
    } else {
      res.status(result.statusCode).send(result.message);
    }
  }

  async deleteComment(req, res) {
    const commentId = req.params.commentId;

    const { jwtToken } = req.cookies;
    let parts = jwtToken.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId;

    const result = await deleteComment(commentId, userId);

    res.status(result.statusCode).send(result.message);
  }

  async putComment(req, res) {
    const commentId = req.params.commentId;
    const content = req.body.content;

    const { jwtToken } = req.cookies;
    let parts = jwtToken.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId;

    const result = await updateComment(commentId, userId, content);

    if (result.status) {
      res.status(result.statusCode).json({
        res: "Comment Updated sucessfully!!",
        comment: result.message,
      });
    } else {
      res.status(result.statusCode).send(result.message);
    }
  }
}
