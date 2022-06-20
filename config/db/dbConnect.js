import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database Connected");
  } catch (err) {
    console.log(err.message);
    console.log("Problem While Connecting Database, Please Try Again Later");
  }
};

export default dbConnect;
