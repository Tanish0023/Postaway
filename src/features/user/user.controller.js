import userModel from "./user.model.js";
import jwt from "jsonwebtoken";

export default class userController {
  addUser(req, res) {
    userModel.add(req.body);
    res.status(201).send("User added successfully!!");
  }

  getUser(req, res) {
    const users = userModel.get();
    res.status(200).json(users);
  }

  confirmUser(req, res) {
    const result = userModel.signin(req.body);

    if (result) {
      const token = jwt.sign(
        {
          userID: result.id,
          email: result.email,
        },
        "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz",
        {
          expiresIn: "1h",
        }
      );
      // console.log(token);
      res.status(200).send(token);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  }
}
