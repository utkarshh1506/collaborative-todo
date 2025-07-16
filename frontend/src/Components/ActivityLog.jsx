import React, { useEffect, useState, useRef } from "react";
import "./ActivityLog.css";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:7000"); // Adjust if using env or hosted

const ActivityLog = ({ onClose }) => {
  const [logs, setLogs] = useState([]);
  const panelRef = useRef();
  const logEndRef = useRef();

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:7000/api/logs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLogs(res.data);
    } catch (err) {
      console.error("❌ Failed to load logs:", err.message);
    }
  };

  useEffect(() => {
    fetchLogs();

    socket.on("new-activity", fetchLogs); // Listen for real-time log updates

    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      socket.off("new-activity", fetchLogs); // Clean up listener only
    };
  }, []);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  return (
    <div className="activity-overlay">
      <div className="activity-panel" ref={panelRef}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>🕘 Activity Log</h2>
        <div className="log-list">
          {logs.length === 0 ? (
            <p className="empty">No activity yet.</p>
          ) : (
            logs.map((log) => (
              <div key={log._id} className="log-item">
                <div className="log-text">
                  <strong>{log.user?.name || "Unknown"}</strong> — {log.message}
                </div>
                <div className="log-time">
                  {new Date(log.createdAt).toLocaleString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    day: "numeric",
                    month: "short",
                  })}
                </div>
              </div>
            ))
          )}
          <div ref={logEndRef} /> {/* Scrolls to bottom */}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
