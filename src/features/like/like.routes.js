import express from "express";
import likeController from "./like.controller.js";

const likeRouter = express.Router();
const likeControllerCall = new likeController();

likeRouter.get("/:postId", likeControllerCall.post);
likeRouter.get("/toggle/:postId", likeControllerCall.toggle);

export default likeRouter;
