import mongoose, { ConnectOptions } from "mongoose";
import "../../env.js";

const connectDB = async (): Promise<void> => {
  try {
    const {
      MONGODB_USER,
      MONGODB_PASSWORD,
      MONGODB_HOST,
      MONGODB_LOCAL_PORT,
      MONGODB_DATABASE,
    } = process.env;

    if (
      !MONGODB_USER ||
      !MONGODB_PASSWORD ||
      !MONGODB_HOST ||
      !MONGODB_LOCAL_PORT ||
      !MONGODB_DATABASE
    ) {
      throw new Error("Missing required environment variables");
    }
    const mongodbUri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/`;
    // const mongodbUri = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_LOCAL_PORT}/${MONGODB_DATABASE}?authSource=admin&directConnection=true`;

    await mongoose.connect(mongodbUri, {} as ConnectOptions);

    console.log("Connected to Database successfully.");
  } catch (error) {
    console.error("Connect Database error: " + error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
