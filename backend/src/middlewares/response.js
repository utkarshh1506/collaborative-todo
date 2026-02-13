const {
    SuccessResponse,
    ErrorResponse,
    ServerErrorResponse,
} = require('../framework/core/response');

const responseHandler = (req, res, next) => {
  res.success = (data, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json(
      new SuccessResponse({ data, message, statusCode })
    );
  };

  res.error = (message = "Error", statusCode = 422) => {
    return res
      .status(statusCode)
      .json(new ErrorResponse({ message, statusCode }));
  };

  res.serverError = (message = "Server Error", statusCode = 500) => {
    return res
      .status(statusCode)
      .json(new ServerErrorResponse({ message, statusCode }));
  };

  next();
};

module.exports = responseHandler;