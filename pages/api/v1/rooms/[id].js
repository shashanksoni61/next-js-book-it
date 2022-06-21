import nextConnect from "next-connect";

import connectDB from "@config/db/db";

import { getSingleRoom, updateRoom } from "@controllers/room";
import { objectIdErrorHandler } from "middlewares/errorHandler";

const handler = nextConnect();

handler.use(objectIdErrorHandler);
handler.get(getSingleRoom);

// todo - add admin middleware in this route
handler.put(updateRoom);

export default connectDB(handler);
