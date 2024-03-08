import mongoose, { mongo } from "mongoose";
import { userSchema } from "./user.schema.js";
import bcrypt from "bcrypt";
import { ApplicationError } from "../../error handler/applicationError.js";

export const userRegister = async (name, email, password, gender) => {
  try {
    const userModel = mongoose.model("User", userSchema);

    const userFindEmail = await userModel.findOne({ email: email });

    if (userFindEmail) {
      return {
        status: false,
        message: "Email already exists",
        statusCode: 400,
      };
    }

    const newUser = new userModel({
      name,
      email,
      password,
      gender,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;

    const savedUser = userModel(newUser);

    await savedUser.save();

    return {
      status: true,
      message: newUser,
      statusCode: 201,
    };
  } catch (err) {
    console.log(err.errors);
    if (err.errors["name"]) {
      return {
        status: false,
        message: err.errors.name.message,

        statusCode: 400,
      };
    } else if (err.errors["gender"]) {
      return {
        status: false,
        message: err.errors.gender.message,

        statusCode: 400,
      };
    } else if (err.errors["email"]) {
      return {
        status: false,
        message: err.errors.email.properties.message,
        statusCode: 400,
      };
    }
  }
};

export const signin = async (email, password) => {
  try {
    const userModel = mongoose.model("User", userSchema);

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return {
        status: false,
        message: "Please Enter a valid email",
        statusCode: 404,
      };
    }

    const hashedPasswordCheck = await bcrypt.compare(password, user.password);

    if (!hashedPasswordCheck) {
      return {
        status: false,
        message: "Please Enter a valid password",
        statusCode: 404,
      };
    }

    return {
      status: true,
      message: user,
      statusCode: 200,
    };
  } catch (err) {
    return {
      status: false,
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
};

export const userDetails = async (userId) => {
  try {
    const userModel = mongoose.model("users", userSchema);

    const user = await userModel
      .findById(userId)
      .select("name email gender post friends");
    if (!user) {
      return {
        status: false,
        message: "User not found",
        statusCode: 404,
      };
    } else {
      return {
        status: true,
        message: user,
        statusCode: 200,
      };
    }
  } catch (err) {
    throw new ApplicationError("Internal server error", 500);
  }
};

export const allDetails = async () => {
  try {
    const userModel = mongoose.model("users", userSchema);

    const users = await userModel
      .find()
      .select("name email gender post friends");

    return users;
  } catch (err) {
    throw new ApplicationError("Internal server error", 500);
  }
};

export const resetPassword = async (userId, newPassword) => {
  try {
    const userModel = mongoose.model("users", userSchema);

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const user = await userModel.findByIdAndUpdate(userId, {
      password: hashedNewPassword,
    });
    // const savedUpdatedUserPassword = await user.save();
    if (user) {
      return {
        status: true,
        message: "Password updated successfully",
        statusCode: 200,
      };
    } else {
      return {
        status: false,
        message: "User not found, please enter a valid email",
        statusCode: 404,
      };
    }
  } catch (err) {
    throw new ApplicationError("Internal server error", 500);
  }
};

export const updateDetails = async (userId, name, email, gender) => {
  const userModel = mongoose.model("users", userSchema);

  const user = await userModel
    .findByIdAndUpdate(userId, {
      name: name,
      email: email,
      gender: gender,
    })
    .select("name email gender post friends");

  return user;
};
