const Task = require('../models/Task');

// ✅ Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      status,
      assignedTo,
      user: req.user.id  // ✅ Comes from authMiddleware
    });

    // ✅ Emit socket event for real-time updates
    const io = req.app.get('io');
    io.emit('refresh-tasks');

    return res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Task creation failed',
      error: err.message
    });
  }
};

// ✅ Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name profilePicture');

    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to fetch tasks',
      error: err.message
    });
  }
};

// ✅ Update Task
exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, priority, status, assignedTo } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, priority, status, assignedTo },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // ✅ Emit socket event on update
    const io = req.app.get('io');
    io.emit('refresh-tasks');

    return res.status(200).json({
      message: 'Task updated successfully',
      task
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Task update failed',
      error: err.message
    });
  }
};

// ✅ Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const io = req.app.get('io');
    io.emit('refresh-tasks');

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    return res.status(500).json({
      message: 'Task deletion failed',
      error: err.message
    });
  }
};
