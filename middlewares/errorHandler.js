import colors from "colors";
import { responseHandler } from "@utils/backend/responseHandler";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const objectIdErrorHandler = (req, res, next) => {
  const id = req.query.id;
  if (ObjectId.isValid(id)) next();
  else responseHandler(res, 400, false, null, "Invalid Id Or Bad Request");
};

export const errorMiddleware = (err, req, res, next) => {
  let message = err.message;

  if (err.name === "ValidationError") {
    message = Object.values(err.errors).map((value) => value.message)?.[0];
  }

  if (err.name === "CastError") {
    message = "Invalid Id";
  }

  console.log(
    colors.bgMagenta({
      error: {
        error: err,
        message: err.message,
        stack: err.stack,
      },
    })
  );
  responseHandler(res, 400, false, null, message);
};
