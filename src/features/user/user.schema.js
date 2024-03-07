import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must have minimum of 3 letters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => /\S+@\S+\.\S+/.test(email),
      message: "Please provide a valid email address.",
    },
  },
  password: {
    type: String,

    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "Other"],
      message: "{VALUE} is not supported please enter Male, Female or Other",
    },
    required: [true, "Gender is required"],
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      default: undefined,
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "friends",
      default: undefined,
    },
  ],
});
