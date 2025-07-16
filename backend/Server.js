const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const logRoutes = require("./routes/logRoutes");
const { Server } = require("socket.io");
const http = require("http");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// ✅ Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// ✅ Make io available inside routes/controllers
app.set("io", io);

// ✅ Handle socket connections
io.on("connection", (socket) => {
  console.log("🔌 A user connected");

  // ✅ Listen to generic task-change event (used on frontend)
  socket.on("task-change", () => {
    socket.broadcast.emit("refresh-tasks");
    socket.broadcast.emit("new-activity"); // ✅ This is what was missing!
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");
  });
});

// ✅ Middleware
app.use(cors({ origin: "https://collaborative-todo-three.vercel.app/", credentials: true }));
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/logs", logRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
});
