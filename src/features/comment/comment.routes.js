import express from "express";
import commentController from "./comment.controller.js";

const commentRouter = express.Router();
const commentControllerCall = new commentController();

commentRouter.get("/:id", commentControllerCall.getComment);
commentRouter.post("/:id", commentControllerCall.postComment);
commentRouter.delete("/:id", commentControllerCall.deleteComment);
commentRouter.put("/:id", commentControllerCall.putComment);

export default commentRouter;
