const Logger = require("../framework/core/logger");

class AuditLogger {
  static log({
    message = "",
    action_type = "UPDATED",
    action_by_user_id = "",
    action_by_user_name = "",
    table = "",
    id = "",
    data = {},
  }) {
    Logger.info(message, {
      type: "AUDIT",
      action_type,
      action_by_user_id,
      action_by_user_name,
      table,
      id,
      data,
    });
  }
}

module.exports = AuditLogger;
