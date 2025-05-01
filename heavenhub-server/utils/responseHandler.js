exports.sendResponse = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({
    status: "success",
    code: statusCode,
    content: {
      message,
      data,
    },
  });
};

exports.sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message,
  });
};
