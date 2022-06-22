import colors from "colors";

import Room from "@models/Room";
import { responseHandler } from "@utils/backend/responseHandler";
import { searchHelper } from "@utils/backend/searchHelper";
import asyncHandler from "middlewares/asyncHandler";

// desc     View All Rooms
// route    get /api/v1/rooms
// access   Pubilc
export const allRooms = asyncHandler(async (req, res) => {
  const aggregateQuery = [];
  const searchFiled = req.query.search || false;

  if (searchFiled) {
    aggregateQuery.push(
      searchHelper(searchFiled, ["name", "pricePerNight", "address"])
    );
  }

  const data = searchFiled
    ? await Room.aggregate(aggregateQuery).collation({
        locale: "en",
      })
    : await Room.find();
  const result = { totalRecords: data.length, list: data };

  if (data.length === 0) {
    return responseHandler(res, 404, true, result, "No Rooms Found");
  }

  return responseHandler(res, 200, true, result, "Get All Rooms Success");
});

// todo - Learn aggregate querying & implement allRooms

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
  try {
    const room = await Room.findById(req.query.id);

    if (!room) return responseHandler(res, 404, false, null, "Room not found");

    responseHandler(res, 200, true, room, "Room Details");
  } catch (error) {
    console.log(colors.bgMagenta(error.message));
    responseHandler(res, 400, false, null, error.message);
  }
};

// desc     Update Room Details
// route    put /api/v1/rooms/:id
// access   Pubilc // todo - Make This Route Private
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);

    if (!room) return responseHandler(res, 404, false, null, "Room not found");

    const updatedRoom = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    responseHandler(res, 200, true, updatedRoom, "Room Updated Successfully");
  } catch (error) {
    console.log(colors.bgMagenta(error.message));
    responseHandler(res, 400, false, null, error.message);
  }
};

// desc     Delete Room Details
// route    Delete /api/v1/rooms/:id
// access   Pubilc // todo - Make This Route Private
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id);

    if (!room) return responseHandler(res, 404, false, null, "Room not found");

    await room.remove();

    responseHandler(res, 200, true, null, "Room Removed Successfully");
  } catch (error) {
    console.log(colors.bgMagenta(error.message));
    responseHandler(res, 400, false, null, error.message);
  }
};
