const ActionLog = require('../models/ActionLog');

exports.getRecentLogs = async (req, res) => {
  try {
    const logs = await ActionLog.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('user', 'name profilePicture')
      .populate('task', 'title');

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs', error: err.message });
  }
};
