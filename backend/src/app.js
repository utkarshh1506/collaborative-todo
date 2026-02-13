const express = require('express');
const responseHandler = require('./middlewares/response');
const requestLogger = require('./middlewares/request_logger');
const errorHandler = require('./middlewares/error');

const app = express();

app.use(express.json());
app.use(responseHandler);
app.use(requestLogger);
app.use(errorHandler);

module.exports = app;