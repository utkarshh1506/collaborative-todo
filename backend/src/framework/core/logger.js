const {formatDatetime} = require('../../utils/datetime');

class Logger {
  static info(message, context = {}) {
    Logger._print("INFO", message, null, context);
  }

  static warn(message, context = {}) {
    Logger._print("WARN", message, null, context);
  }

  static error(message, error = null, context = {}) {
    const stack = error?.stack || null;
    Logger._print("ERROR", message, stack, context);
  }

  static _print(level, message, stack = null, context = {}) {
    const timestamp = formatDatetime(new Date());

    let logMessage = `[${timestamp}] ${level}: ${message}`;

    if (Object.keys(context).length > 0) {
      logMessage += ` | ${JSON.stringify(context)}`;
    }

    console.log(logMessage);

    if (stack) {
      console.error(stack);
    }
  }
}

module.exports = Logger;
