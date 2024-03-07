import express from "express";
import commentController from "./comment.controller.js";

const commentRouter = express.Router();
const commentControllerCall = new commentController();

commentRouter.get("/:postId", commentControllerCall.getComment);
commentRouter.post("/:postId", commentControllerCall.postComment);
commentRouter.delete("/:commentId", commentControllerCall.deleteComment);
commentRouter.put("/:commentId", commentControllerCall.putComment);

export default commentRouter;
