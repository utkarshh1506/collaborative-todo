# 🧠 Real-Time Collaborative To-Do Board

A sleek, real-time collaborative task management board with drag-and-drop, authentication, activity logs, user management, profile editing, and more — built using **React**, **Node.js**, **MongoDB**, and **Socket.IO**.

---

## 🚀 Tech Stack

**Frontend:**
- React (with Vite)
- Socket.IO client

**Backend:**
- Express (Node.js)
- MongoDB (Mongoose)
- Socket.IO server
- JWT Authentication

**Deployment:**
- **Frontend** hosted on [Vercel](https://vercel.com)
- **Backend** hosted on [Render](https://render.com)
- MongoDB hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 📦 Features

### ✅ Authentication
- **Register/Login** system with JWT
- Stores token in `localStorage`
- Middleware protected backend routes

### ✅ User Profile
- Users can **upload/edit profile picture** (via Cloudinary)
- Profile displayed in navbar
- Edit profile modal overlay with image upload

### ✅ Task Management
- **Create, Edit, Delete** tasks
- **Drag and drop** tasks across "Todo", "In Progress", and "Done" columns using `@hello-pangea/dnd`
- **Assign tasks to users**
- Modal overlay to add/edit tasks

### ✅ Real-Time Sync
- Uses **Socket.IO** to:
  - Broadcast task changes
  - Live update Activity Log across users
  - Reflect drag & drop changes live
- Multiple users see changes instantly in their own boards

### ✅ Activity Log Panel
- Displays the **last 20 actions** performed by any user
- Auto-updates via Socket.IO when actions happen
- Example log:  
  `Utkarsh updated task "Login UI"`  
  `Shreya deleted task "Test Task"`
- Styled like a modal card with blurred background

### ✅ Edit Task Modal
- Appears just like login/register card
- Allows:
  - Changing title, description, status
  - Reassigning user
  - Deleting task

### ✅ Responsive UI
- Clean modern design
- Adaptive layout for task columns
- Scrollbar hidden with pure CSS

---

## 📁 Folder Structure (Simplified)

```
├── client/
│   ├── Components/
│   │   ├── MainNavbar.jsx
│   │   ├── AddTask.jsx
│   │   ├── EditTask.jsx
│   │   ├── ActivityLog.jsx
│   │   ├── Column.jsx
│   │   └── TaskCard.jsx
│   ├── Services/api.js
│   ├── App.jsx
│   └── main.jsx
│
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── ActionLog.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── userRoutes.js
│   │   └── logRoutes.js
│   ├── controllers/
│   ├── middlewares/
│   └── index.js
```

---

## 🔐 Environment Variables

### Frontend `.env`
```
VITE_BACKEND_URL=https://your-backend.onrender.com
```

### Backend `.env`
```
PORT=7000
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 🌐 Deployment Instructions

### 📦 Frontend (Vercel)
1. Push frontend to GitHub
2. Connect repo on [vercel.com](https://vercel.com)
3. Set:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add env var: `VITE_BACKEND_URL`
5. Deploy 🚀

### 📦 Backend (Render)
1. Push backend to GitHub
2. Create a **Web Service** on [render.com](https://render.com)
3. Set:
   - Build: `npm install`
   - Start: `node index.js`
4. Add env variables listed above
5. Deploy 🚀

---

## 🧪 Real-Time Test

Try the app in **two different tabs/accounts**:
- Make a change (create/update/delete)
- It instantly reflects on both tabs
- Activity Log also updates live

---

## 👥 Roles & Contributions

This app supports **multi-user collaboration**, allowing everyone to:
- Manage tasks
- Get live feedback
- Keep track of team activity

---

## 🧊 Future Scope (Ideas)
- Task deadlines & notifications
- Comments under each task
- Filters by assignee or status
- Admin role & permissions

---

## 🤝 Credits

Developed with ❤️ by **Utkarsh Singh** using:
- React
- Node.js
- MongoDB
- Socket.IO
- Cloudinary
- Vercel + Render

---

## 📸 Screenshot Preview

> Add screenshots here if needed later!

---

## 📝 License

MIT License — feel free to use, modify, and share.
