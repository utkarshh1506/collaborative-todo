class SuccessResponse {
    constructor(data, message = 'Success', status_code = 200) {
        this.error = false;
        this.status_code = status_code;
        this.message = message;
        this.data = data;
    }
}

class ErrorResponse {
  constructor({ message = "Error occurred", status_code = 422 }) {
    this.message = message;
    this.error = true;
    this.status_code = status_code;
    this.data = null;
  }
}

class ServerErrorResponse {
  constructor({ message = "Server Error", status_code = 500 }) {
    this.message = message;
    this.error = true;
    this.status_code = status_code;
    this.data = null;
  }
}

module.exports = {
  SuccessResponse,
  ErrorResponse,
  ServerErrorResponse,
};