import nextConnect from "next-connect";

import connectDB from "@config/db/db";

import { deleteRoom, getSingleRoom, updateRoom } from "@controllers/room";
import { objectIdErrorHandler } from "middlewares/errorHandler";

const handler = nextConnect();

handler.use(objectIdErrorHandler);
handler.get(getSingleRoom);

// todo - add admin middleware in these routes
handler.put(updateRoom);
handler.delete(deleteRoom);
export default connectDB(handler);
