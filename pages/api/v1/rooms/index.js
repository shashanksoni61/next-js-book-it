import nextConnect from "next-connect";

import { allRooms } from "@controllers/room";
import dbConnect from "config/db/dbConnect";

const handler = nextConnect();
dbConnect();

handler.get(allRooms);

export default handler;
