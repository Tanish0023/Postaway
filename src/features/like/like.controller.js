import likeModel from "./like.model.js";

export default class likeController {
  post(req, res) {
    const postId = req.params.postId;

    const token = req.get("Authorization");
    let parts = token.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userID;

    const likesArray = likeModel.getLikes(postId);

    if (likesArray.length > 0) {
      res.status(200).json(likesArray);
    } else {
      res.status(404).send("Data not found");
    }
  }

  toggle(req, res) {
    const postId = req.params.postId;

    const token = req.get("Authorization");
    let parts = token.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userID;

    const result = likeModel.toggle(postId, userId);
    if (result) {
      res.status(200).send("Like Added to post");
    } else {
      res.status(200).send("Like removed to post");
    }
  }
}
