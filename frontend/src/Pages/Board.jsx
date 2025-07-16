import React, { useEffect, useState, useRef } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useNavigate } from "react-router-dom";
import Column from "../Components/Column";
import MainNavbar from "../Components/MainNavbar";
import AddTask from "../Components/AddTask";
import ActivityLog from "../Components/ActivityLog";
import EditTask from "../Components/EditTask";
import {
  getAllTasks,
  updateTask,
  getAllUsers,
  createTask,
  deleteTask,
} from "../Services/api";
import { io } from "socket.io-client";
import "./Board.css";

const Board = () => {
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [showAddTask, setShowAddTask] = useState(false);
  const [showLogPanel, setShowLogPanel] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [users, setUsers] = useState([]);
  const socket = useRef(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      const tasks = res.data;

      const grouped = {
        todo: tasks.filter((task) => task.status === "todo"),
        inProgress: tasks.filter((task) => task.status === "inProgress"),
        done: tasks.filter((task) => task.status === "done"),
      };
      setColumns(grouped);
    } catch (err) {
      console.error("❌ Failed to load tasks:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Failed to load users:", err);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const res = await createTask(taskData);
      const createdTask = res.data.task;

      setColumns((prev) => ({
        ...prev,
        todo: [createdTask, ...prev.todo],
      }));

      socket.current.emit("task-change");
    } catch (err) {
      console.error("❌ Failed to create task:", err);
    }
  };

  const handleEditTaskClick = (task) => {
    setSelectedTask(task);
    setShowEdit(true);
  };

  const handleUpdateTask = async (updatedData) => {
    try {
      await updateTask(updatedData.id, updatedData);
      await fetchTasks();
      socket.current.emit("task-change");
      setShowEdit(false);
    } catch (err) {
      console.error("❌ Failed to update task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      await fetchTasks();
      socket.current.emit("task-change");
      setShowEdit(false);
    } catch (err) {
      console.error("❌ Failed to delete task:", err);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceTasks = [...sourceColumn];
    const destTasks = [...destColumn];

    const [movedTask] = sourceTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: sourceTasks,
      }));
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destTasks,
      }));
    }

    try {
      await updateTask(movedTask._id, { status: movedTask.status });
      socket.current.emit("task-change");
    } catch (err) {
      console.error("❌ Failed to update task:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    socket.current = io("http://localhost:7000", {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.current.on("refresh-tasks", fetchTasks);

    fetchTasks();
    fetchUsers();

    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <>
      <MainNavbar />
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 className="quote">
          Small steps every day lead to big changes. Start now, stay consistent.
        </h2>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="add-task-btn" onClick={() => setShowAddTask(true)}>
            + Go for the Change
          </button>
          <button
            className="add-task-btn"
            onClick={() => setShowLogPanel(true)}
          >
            View Activity Log
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <Column
              columnId="todo"
              title="Todo"
              tasks={columns.todo}
              onEdit={handleEditTaskClick}
            />
            <Column
              columnId="inProgress"
              title="In Progress"
              tasks={columns.inProgress}
              onEdit={handleEditTaskClick}
            />
            <Column
              columnId="done"
              title="Completed"
              tasks={columns.done}
              onEdit={handleEditTaskClick}
            />
          </div>
        </DragDropContext>

        {showAddTask && (
          <AddTask
            onClose={() => setShowAddTask(false)}
            onTaskAdd={handleAddTask}
            users={users}
          />
        )}

        {showLogPanel && (
          <ActivityLog
            onClose={() => setShowLogPanel(false)}
            socket={socket.current}
          />
        )}

        {showEdit && selectedTask && (
          <EditTask
            task={selectedTask}
            onClose={() => setShowEdit(false)}
            onSave={handleUpdateTask}
            onDelete={handleDeleteTask}
            users={users}
          />
        )}
      </div>
    </>
  );
};

export default Board;
