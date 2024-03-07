export default class likeController {
  getLikes(req, res) {
    const postId = req.params.postId;

    const { jwtToken } = req.cookies;
    let parts = jwtToken.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId;
    // const likesArray = likeModel.getLikes(postId);

    if (likesArray.length > 0) {
      res.status(200).json(likesArray);
    } else {
      res.status(404).send("Data not found");
    }
  }

  toggle(req, res) {
    const postId = req.params.postId;

    const { jwtToken } = req.cookies;
    let parts = jwtToken.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId;

    // const result = likeModel.toggle(postId, userId);
    if (result) {
      res.status(200).send("Like Added to post");
    } else {
      res.status(200).send("Like removed to post");
    }
  }
}
