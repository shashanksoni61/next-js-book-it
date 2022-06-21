import { responseHandler } from "@utils/backend/responseHandler";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const objectIdErrorHandler = (req, res, next) => {
  const id = req.query.id;
  if (ObjectId.isValid(id)) next();
  else responseHandler(res, 400, false, null, "Invalid Id Or Bad Request");
};
