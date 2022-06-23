import colors from "colors";
import User from "@models/User";

import asyncHandler from "middlewares/asyncHandler";
import { responseHandler } from "@utils/backend/responseHandler";

// desc     Register User
// route    get /api/v1/auth/register
// access   Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser) {
    return responseHandler(res, 400, false, null, "User Already Exist");
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "cloudinary sample image",
      url: "https://res.cloudinary.com/ssoni/image/upload/v1655960012/cld-sample.jpg",
    },
  });

  const result = {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    _id: user._id,
  };
  // console.log(colors.magenta(result));

  return responseHandler(
    res,
    200,
    true,
    result,
    "Account Registered Successfull"
  );
});
