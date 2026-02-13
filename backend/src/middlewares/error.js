const Logger = require("../framework/core/logger");

const errorHandler = (err, req, res, next) => {
  // Log error
  Logger.error(err.message, err, {
    path: req.originalUrl,
    method: req.method,
  });

  return res.serverError(err.message || "Internal Server Error");
};

module.exports = errorHandler;