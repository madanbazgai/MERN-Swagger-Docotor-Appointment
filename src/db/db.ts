import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const uri = process.env.MONGODB_URI;
export const connectDB = async () => {
  try {
    if (!uri) {
      throw new Error("MongoDB URI is not defined");
    }
    await mongoose.connect(uri);
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error("Database connection failed");
    throw err; // Stop the execution and re-throw the error
  }
};
