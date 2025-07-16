import React, { useState, useEffect } from "react";
import "./EditTask.css";

const EditTask = ({ task, onClose, onSave, onDelete, users }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "todo",
    assignedTo: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        assignedTo: task.assignedTo?._id || "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.title) {
      alert("Title is required");
      return;
    }
    onSave({ ...formData, id: task._id });
  };

  return (
    <div className="edit-overlay">
      <div className="edit-card">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Edit Task</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
        />

        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Completed</option>
        </select>

        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
        >
          <option value="">Unassigned</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <div className="edit-actions">
          <button className="delete-btn" onClick={() => onDelete(task._id)}>
            Delete
          </button>
          <button className="save-btn" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
