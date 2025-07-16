
import React, { useEffect, useState, useRef } from "react";
import "./ActivityLog.css";
import axios from "axios";

const ActivityLog = ({ onClose, socket }) => {
  const [logs, setLogs] = useState([]);
  const panelRef = useRef();
  const logEndRef = useRef();

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/logs`, {
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

    if (socket) {
      socket.on("new-activity", fetchLogs);
    }

    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (socket) {
        socket.off("new-activity", fetchLogs);
      }
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
        <h2>Activity Log</h2>
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
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
