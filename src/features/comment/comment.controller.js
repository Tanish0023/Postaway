export default class commentController {
  getComment(req, res) {
    const postId = req.params.id;
    const comments = commentModel.get(postId);

    if (comments.length > 0) {
      res.status(202).json(comments);
    } else {
      res.status(404).send("No data found");
    }
  }

  postComment(req, res) {
    const postId = req.params.id;
    const content = req.body.content;

    const token = req.get("Authorization");
    let parts = token.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userID;

    const result = commentModel.add(userId, postId, content);

    if (result) {
      res.status(200).send("Comment Added successfully");
    } else {
      res.status(404).send("Cannot add comment to this post id");
    }
  }

  deleteComment(req, res) {
    const commentId = req.params.id;

    const token = req.get("Authorization");
    let parts = token.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userID;

    const result = commentModel.delete(userId, commentId);

    res.status(200).send("Comment Deleted successfully");
  }

  putComment(req, res) {
    const commentId = req.params.id;
    const content = req.body.content;

    const token = req.get("Authorization");
    let parts = token.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userID;

    commentModel.update(userId, commentId, content);

    res.status(200).send("Comment Updated successfully");
  }
}
