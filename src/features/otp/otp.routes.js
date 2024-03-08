import express from "express";
import otpController from "./otp.controller.js";

const otpRoutes = express.Router();

const otpControllerCall = new otpController();

otpRoutes.post("/send", otpControllerCall.otpSend);
otpRoutes.post("/verify", otpControllerCall.verify);
otpRoutes.post("/reset-password", otpControllerCall.passwordReset);

export default otpRoutes;
