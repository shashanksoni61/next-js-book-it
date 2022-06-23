import nextConnect from "next-connect";

import connectDB from "@config/db/db";
import { errorMiddleware as onError } from "middlewares/errorHandler";
import { registerUser } from "@controllers/auth";

const handler = nextConnect({
  onError,
});

handler.post(registerUser);

export default connectDB(handler);
