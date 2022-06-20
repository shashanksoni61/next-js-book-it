import nextConnect from "next-connect";

import { allRooms } from "@controllers/room";
import connectDB from "@config/db/db";

const handler = nextConnect();

handler.get(allRooms);

export default connectDB(handler);
