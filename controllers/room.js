import colors from "colors";

import Room from "@models/Room";
import { responseHandler } from "@utils/backend/responseHandler";

// desc     View All Rooms
// route    get /api/v1/rooms
// access   Pubilc
export const allRooms = async (req, res) => {
  try {
    const data = await Room.find();
    responseHandler(res, 200, true, data, "Get All Rooms Success");
  } catch (error) {
    responseHandler(res, 401, false, null, error.message);
  }
};

// desc     Create New Rooms
// route    get /api/v1/rooms
// access   Pubilc // todo - Make This Route Private
export const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(200).json({
      success: true,
      message: "Room Created Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// desc     Get Room Details
// route    get /api/v1/rooms/:id
// access   Pubilc
export const getSingleRoom = async (req, res) => {
  console.log("query params".bgMagenta, req.params);
  try {
    const room = await Room.findById(req.query.id);

    if (!room) return responseHandler(res, 404, false, null, "Room not found");

    responseHandler(res, 200, true, room, "Room Details");
  } catch (error) {
    console.log(colors.bgMagenta(error.message));
    responseHandler(res, 400, false, null, error.message);
  }
};
