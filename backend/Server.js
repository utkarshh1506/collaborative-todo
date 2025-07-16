const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const { Server } = require("socket.io");
const http = require("http");
const logRoutes = require('./routes/logRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // ✅ wrap app with http server

// ✅ Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // You can restrict to frontend domain in prod
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
  },
});

// ✅ Save io globally using app.set()
app.set("io", io);

// ✅ Socket.io connection event
io.on("connection", (socket) => {
  console.log("🔌 A user connected");

  socket.on("task-change", () => {
    socket.broadcast.emit("refresh-tasks");
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");
  });
});

app.use(cors({origin:"http://localhost:5173", credentials:true}));
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.use('/api/logs', logRoutes);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
});
