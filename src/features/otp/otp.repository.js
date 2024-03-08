import mongoose from "mongoose";
import { otpSchema } from "./otp.schema.js";
import { userSchema } from "../user/user.schema.js";
import bcrypt from "bcrypt";
import { ApplicationError } from "../../error handler/applicationError.js";

export const otpSend = async (email, opt) => {
  const otpModel = mongoose.model("Otp", otpSchema);
  const userModel = mongoose.model("User", userSchema);

  const userExist = await userModel.findOne({ email: email });
  if (!userExist) {
    return {
      status: false,
      message: "Please enter a valid email!!",
      statusCode: 404,
    };
  }

  const findOtpAlreadyExists = await otpModel.findOne({ email: email });
  const hashedOtp = await bcrypt.hash(opt, 10);
  if (findOtpAlreadyExists) {
    findOtpAlreadyExists.otp = hashedOtp;
    await findOtpAlreadyExists.save();

    return {
      status: true,
      message: "Otp re-sent successfully!",
      statusCode: 200,
    };
  } else {
    const otp = new otpModel({ email: email, otp: hashedOtp });
    await otp.save();

    return { status: true, message: "Otp sent successfully!", statusCode: 200 };
  }
};

export const varifyOtpRepo = async (email, otp) => {
  try {
    const otpModel = mongoose.model("Otp", otpSchema);
    const userModel = mongoose.model("User", userSchema);

    const userExist = await userModel.findOne({ email: email });
    if (!userExist) {
      return {
        status: false,
        message: "Please enter a valid email!!",
        statusCode: 404,
      };
    }

    const optFind = await otpModel.findOne({ email });
    if (optFind) {
      const optVerify = await bcrypt.compare(otp, optFind.otp);
      console.log(optVerify);
      if (optVerify) {
        console.log("hhh");
        await otpModel.findOneAndDelete({ email: email });

        console.log("oooo");
        return {
          status: true,
          message: "Otp verified successfully!!",
          statusCode: 200,
        };
      } else {
        return {
          status: false,
          message: "Otp verification failed!!",
          statusCode: 400,
        };
      }
    } else {
      return {
        status: false,
        message: "Please generate otp before verifying",
        statusCode: 400,
      };
    }
  } catch (err) {
    throw new ApplicationError("Internal server error!!", 500);
  }
};
