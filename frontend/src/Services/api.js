import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("🔐 Attaching token");
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getAllTasks = () => API.get("/tasks");
export const createTask = (data) => API.post("/tasks", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const getAllUsers = () => API.get("/users");
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const getLogs = () => API.get("/logs");
