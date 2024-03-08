import jwt from "jsonwebtoken";
import {
  userRegister,
  signin,
  userDetails,
  allDetails,
  updateDetails,
} from "./user.repository.js";
import { ApplicationError } from "../../error handler/applicationError.js";

export default class userController {
  async signUn(req, res) {
    const { name, email, password, gender } = req.body;

    const result = await userRegister(name, email, password, gender);
    if (result.status) {
      res.status(result.statusCode).send(result.message);
    } else {
      res.status(result.statusCode).send(result.message);
      // throw new ApplicationError(result.statusCode, result.message);
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const result = await signin(email, password);
      // console.log(result);
      // console.log({ userId: result._id, email: result.email });
      if (result.status) {
        const token = jwt.sign(
          {
            userId: result.message._id,
            email: result.message.email,
          },
          "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz",
          {
            expiresIn: "1h",
          }
        );
        res
          .cookie("jwtToken", token, {
            maxAge: 1 * 60 * 60 * 1000,
            httpOnly: true,
          })
          .status(200)
          .json({ res: "Login successfull!!", token: token });
      } else {
        res.status(result.statusCode).send(result.message);
      }
    } catch (err) {
      res.status(result.statusCode).send(result.message);
    }
  }

  userLogout = (req, res) => {
    res
      .clearCookie("jwtToken")
      .json({ success: true, msg: "logout successful" });
  };

  getDetails = async (req, res) => {
    const user = await userDetails(req.params.userId);
    res.status(user.statusCode).send(user.message);
  };

  getAllDetails = async (req, res) => {
    const users = await allDetails();
    res.status(200).send(users);
  };

  updateDetails = async (req, res) => {
    const { name, email, gender } = req.body;

    const { jwtToken } = req.cookies;
    let parts = jwtToken.split(".");
    let payload = JSON.parse(atob(parts[1]));
    const userId = payload.userId;

    const user = await updateDetails(userId, name, email, gender);

    res.status(200).send(user);
  };
}
