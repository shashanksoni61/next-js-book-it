export const responseHandler = (
  response,
  statucCode = 400,
  success = false,
  data = null,
  message = ""
) => {
  return response.status(statucCode).json({
    success,
    data,
    message,
  });
};
