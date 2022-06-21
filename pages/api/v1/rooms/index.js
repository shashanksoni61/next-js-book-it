import nextConnect from "next-connect";

import { allRooms, createRoom } from "@controllers/room";
import connectDB from "@config/db/db";

const handler = nextConnect();

handler.get(allRooms);
handler.post(createRoom);

export default connectDB(handler);
