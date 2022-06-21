import Room from "@models/Room";
import { responseHandler } from "@utils/backend/responseHandler";

export const allRooms = async (req, res) => {
  try {
    const data = await Room.find();
    responseHandler(res, 200, true, data, "Get All Rooms Success");
  } catch (error) {
    responseHandler(res, 401, false, null, error.message);
  }
};

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
