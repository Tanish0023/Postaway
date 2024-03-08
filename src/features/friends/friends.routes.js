import express from "express";
import friendController from "./friends.controller.js";

const friendRouter = express.Router();

const friendControllerCall = new friendController();

friendRouter.get("get-friends/:userId", friendControllerCall.getFriend);
friendRouter.get("get-pending-requests", friendControllerCall.pendingRequest);
friendRouter.get(
  "toggle-friendship/:friendId",
  friendControllerCall.toggleFriendship
);
friendRouter.get(
  "response-to-request/:friendId",
  friendControllerCall.responseToRequest
);

export default friendRouter;
