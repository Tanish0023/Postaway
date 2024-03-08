import { createTransport } from "nodemailer";
import otpGenerator from "otp-generator";
import { otpSend, varifyOtpRepo } from "./otp.repository.js";
import { resetPassword } from "../user/user.repository.js";

export default class otpController {
  async otpSend(req, res) {
    const email = req.body.email;

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const result = await otpSend(email, otp);

    if (result.status) {
      const transporter = createTransport({
        service: "gmail",
        auth: {
          user: "emailsender604@gmail.com",
          pass: "ggbj qrmz fhkz ttal",
        },
      });

      // COnfigure Email content
      const mainOption = {
        from: "emailsender604@gmail.com",
        to: email,
        subject: "OTP to reset password",
        text: `Your OTP is ${otp}\n\nUse this otp to reset your password\n\nRegards,\nPostaway`,
      };

      // Sending Email
      try {
        await transporter.sendMail(mainOption);
        console.log("Mail send successfully");
        res.status(result.statusCode).send(result.message);
      } catch (err) {
        console.log("Email send failed with error:  " + err);
      }
    } else {
      res.status(result.statusCode).send(result.message);
    }
  }

  async verify(req, res) {
    const { email, otp } = req.body;

    const result = await varifyOtpRepo(email, String(otp));
    console.log(result);
    res.status(result.statusCode).send(result.message);
  }

  async passwordReset(req, res) {
    const { newPassword } = req.body;

    const { jwtToken } = req.cookies;
    let parts = jwtToken.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId;

    const result = await resetPassword(userId, newPassword);

    res.status(result.statusCode).send(result.message);
  }
}
