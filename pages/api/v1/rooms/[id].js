import nextConnect from "next-connect";

import connectDB from "@config/db/db";

import { getSingleRoom } from "@controllers/room";
import { objectIdErrorHandler } from "middlewares/errorHandler";

const handler = nextConnect();

handler.use(objectIdErrorHandler);
handler.get(getSingleRoom);

export default connectDB(handler);
