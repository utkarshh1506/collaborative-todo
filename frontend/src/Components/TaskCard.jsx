import React from "react";
import "./TaskCard.css";

const TaskCard = ({ task }) => {
  const {
    title,
    description,
    priority,
    labels = [],
    createdAt,
    assignedTo,
  } = task;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const getPriorityColor = (level) => {
    switch (level) {
      case "Low":
        return "green";
      case "Medium":
        return "orange";
      case "High":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="task-card">
      <div className={`priority-badge ${getPriorityColor(priority)}`}>
        {priority}
      </div>

      <p className="title">{title}</p>
      <p className="description">{description}</p>

      <div className="labels">
        {labels.map((label, index) => (
          <span key={index} className="label-badge">
            {label}
          </span>
        ))}
      </div>

      <div className="bottom-section">
        <p className="date">{formatDate(createdAt)}</p>
        <div className="avatars">
          {assignedTo && (
            <img
              src={
                assignedTo.profilePicture ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt={assignedTo.name || "User"}
              className="avatar"
              title={assignedTo.name || 'User'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
