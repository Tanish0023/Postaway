import mongoose from "mongoose";

const baseUrl = process.env.MONGODB || "0.0.0.0:27017";
// console.log(baseUrl);
export const connectToDb = async () => {
  try {
    await mongoose.connect(`mongodb://${baseUrl}/Postaway`);
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
