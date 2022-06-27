import nextConnect from "next-connect";

import connectDB from "@config/db/db";
import { errorMiddleware as onError } from "middlewares/errorHandler";
import { currentUserProfile } from "@controllers/auth";
import { isAuthenticated } from "middlewares/auth";

const handler = nextConnect({
  onError,
});

handler.use(isAuthenticated).get(currentUserProfile);

export default connectDB(handler);
