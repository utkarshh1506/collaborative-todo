import React, { useState } from "react";
import "./AddTask.css"; // ✅ Make sure this CSS exists

const AddTask = ({ onClose, onTaskAdd, users }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setassignedTo] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !assignedTo) return;

    const newTask = {
      title,
      description,
      assignedTo,
      priority,
      status: "todo",
       // Fixed
    };

    await onTaskAdd(newTask);
    onClose();
  };

  return (
    <div className="addtask-overlay">
      <div className="addtask-card">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Make it happen!</h2>
        <form onSubmit={handleSubmit} className="addtask-form">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <select
            value={assignedTo}
            onChange={(e) => setassignedTo(e.target.value)}
            required
          >
            <option value="">-- Assign to User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <button type="submit" className="submit-btn">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
