import { ApplicationError } from "../../error handler/applicationError.js";

export default class userModel {
  constructor(name, email, password) {
    this.id = users.length + 1;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static get() {
    return users;
  }

  static add(user) {
    const userFind = users.find((userI) => userI.email == user.email);

    if (userFind) {
      throw new ApplicationError("Email alreay in use", 404);
    } else {
      const useradded = new userModel(user.name, user.email, user.password);
      users.push(useradded);
    }
  }

  static signin(user) {
    const result = users.findIndex(
      (u) => u.email == user.email && u.password == user.password
    );

    if (result >= 0) {
      return users[result];
    } else {
      throw new ApplicationError("User not found", 404);
    }
  }
}

let users = [
  {
    id: 1,
    name: "Tanish",
    email: "tanish23aggarwal@gmail.com",
    password: "123",
  },
  { id: 2, name: "test", email: "test@gmail.com", password: "12" },
];
