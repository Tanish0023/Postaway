import express from "express";
import postController from "./post.controller.js";
import { uploadFile } from "../../middlewares/imageUpload.middleware.js";

const postRouter = express.Router();
const postControllerCall = new postController();

postRouter.get("/all", postControllerCall.getAll);
postRouter.get("/:id", postControllerCall.getSpePost);
postRouter.get("/", postControllerCall.specificUserPost);
postRouter.post("/", uploadFile.single("imageUrl"), postControllerCall.addPost);
postRouter.delete("/:id", postControllerCall.deletePost);
postRouter.put("/:id", postControllerCall.updatePost);

export default postRouter;
