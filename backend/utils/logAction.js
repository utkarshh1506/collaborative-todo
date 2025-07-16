const ActionLog = require("../models/ActionLog");

const logAction = async (
  { userId, taskId, actionType, message },
  req = null
) => {
  try {
    await ActionLog.create({
      user: userId,
      task: taskId,
      actionType,
      message,
    });

    if (req?.app?.get) {
      const io = req.app.get("io");
      io.emit("new-activity");
    }
  } catch (err) {
    console.error("❌ Failed to log action:", err);
  }
};

module.exports = logAction;
