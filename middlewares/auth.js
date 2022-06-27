import colors from "colors";
import asyncHandler from "./asyncHandler";
import { responseHandler } from "@utils/backend/responseHandler";
import { getToken } from "next-auth/jwt";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const session = await getToken({ req, secret: "test" });

  console.log(colors.cyan({ session }));
  if (!session) {
    return responseHandler(
      res,
      401,
      false,
      null,
      "Login First To Acess This Resouse"
    );
  }

  req.user = session.user;
  next();
});
