import express from "express";
import userController from "./user.controller.js";
// import { userID } from "../../middlewares/userIdCookie.middleware.js";
const router = express.Router();
const userControllerCall = new userController();

router.get("/", userControllerCall.getUser);
router.post("/signup", userControllerCall.addUser);
router.post("/signin", userControllerCall.confirmUser);

export default router;
