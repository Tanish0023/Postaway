import mongoose from "mongoose";
import { friendSchema } from "./friends.schema.js";
import { userSchema } from "../user/user.schema.js";

export const getFriendsRepo = async (userId) => {
  const userModel = mongoose.model("User", userSchema);

  const friends = await userModel
    .findById(userId)
    .select("friends")
    .populate(friends);

  return friends;
};

export const pendingRequestRepo = async (userId) => {
  const friendModel = mongoose.model("Friend", friendSchema);

  const friend = await friendModel.find({ to: userId, status: "pending" });

  return friend;
};

export const toggleFriendshipRepo = async (userId) => {
  const friendModel = mongoose.model("Friend", friendSchema);
  const userModel = mongoose.model("User", userSchema);
};

export const requestRepo = async (userId) => {
  const friendModel = mongoose.model("Friend", friendSchema);
  const userModel = mongoose.model("User", userSchema);
};
