import express from "express";
import likeController from "./like.controller.js";

const likeRouter = express.Router();
const likeControllerCall = new likeController();

likeRouter.get("/:id", likeControllerCall.getLikes);
likeRouter.get("/toggle/:id", likeControllerCall.toggle);

export default likeRouter;
