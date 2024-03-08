import { getLikes, toggleLike } from "./like.repository.js";

export default class likeController {
  async getLikes(req, res) {
    const id = req.params.id;

    const result = await getLikes(id);
    if (result.status) {
      res.status(200).json(result.message);
    } else {
      res.status(404).send(result.message);
    }
  }

  async toggle(req, res) {
    const id = req.params.id;
    const type = req.query.type;

    const { jwtToken } = req.cookies;
    let parts = jwtToken.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId;

    // console.log(`UserId: ${userId}\nid: ${id}\ntype: ${type}`);
    const result = await toggleLike(userId, id, type);

    if (result.status) {
      if (result.added) {
        res
          .status(result.statusCode)
          .json({ res: "Like added successfully!!", like: result.message });
      } else {
        res.status(result.statusCode).send(result.message);
      }
    } else {
      res.status(result.statusCode).send(result.message);
    }
  }
}
