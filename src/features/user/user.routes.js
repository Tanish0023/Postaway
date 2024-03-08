import express from "express";
import userController from "./user.controller.js";
// import { userID } from "../../middlewares/userIdCookie.middleware.js";
const router = express.Router();
const userControllerCall = new userController();

// router.get("/", userControllerCall.getUser);
router.post("/signup", userControllerCall.signUn);
router.post("/signin", userControllerCall.signIn);
router.get("/logout", userControllerCall.userLogout);
// router.post("/logout-alll-devices", userControllerCall.confirmUser);
router.get("/get-details/:userId", userControllerCall.getDetails);
router.get("/get-all-details", userControllerCall.getAllDetails);
router.put("/update-details/:userId", userControllerCall.updateDetails);

export default router;
