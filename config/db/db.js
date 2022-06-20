import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (!process.env.MONGO_URI) {
    throw new Error("Please Set Up Proper Database Connection");
  }
  try {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return handler(req, res);
  } catch (error) {
    console.log(error.message);
    throw new Error("Please Check Database Connection String");
  }
};

export default connectDB;
