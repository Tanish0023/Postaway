import {
  getFriendsRepo,
  toggleFriendshipRepo,
  pendingRequestRepo,
  requestRepo,
} from "./friends.repository.js";

export default class friendController {
  async getFriend(req, res) {
    const userId = req.parmas.userId;

    const friends = await getFriendsRepo(userId);

    res.status(200).send(friends);
  }

  async pendingRequest(req, res) {
    const { jwtToken } = req.cookies;
    let parts = jwtToken.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId;

    const pendingFriend = await pendingRequestRepo(userId);

    res.status(200).send(pendingFriend);
  }

  async toggleFriendship(req, res) {
    const friendId = req.parmas.friendId;
  }

  async responseToRequest(req, res) {
    const friendId = req.parmas.friendId;
  }
}
