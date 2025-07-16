const mongoose = require('mongoose');

const actionLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actionType: { type: String, enum: ['create', 'update', 'delete', 'assign', 'move'], required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  message: { type: String }, // readable string e.g. "Utkarsh moved task 'X' to Done"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActionLog', actionLogSchema);
