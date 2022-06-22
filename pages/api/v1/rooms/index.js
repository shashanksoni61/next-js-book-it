import nextConnect from "next-connect";

import { allRooms, createRoom } from "@controllers/room";
import connectDB from "@config/db/db";
import { errorMiddleware as onError } from "middlewares/errorHandler";

const handler = nextConnect({
  onError,
});

handler.get(allRooms);
handler.post(createRoom);

export default connectDB(handler);
