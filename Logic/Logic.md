# 🧠 Logic Document

This document explains how I implemented two important features in my collaborative to-do board: **Smart Assign** and **Conflict Handling**.

---

## 🤖 Smart Assign – How It Works (In Simple Words)

Smart Assign is a feature that helps in **fairly distributing tasks** among team members. Instead of randomly assigning tasks or leaving it to the user every time, this feature checks which team member currently has the **least number of tasks**, and automatically assigns the new task to them.

### 🧠 My Thought Process:

I wanted to make sure no one gets overloaded while others are free. So, whenever a task is created:

- The system checks how many **active (not completed)** tasks each user has.
- The one with the **fewest tasks** gets the new task automatically.

### 📘 Example:

Suppose we have 3 users:

- Shreya has 3 tasks
- Utkarsh has 1 task
- Aditi has 4 tasks

The new task will go to **Utkarsh**, since he’s handling the least work right now.

---

## ⚔️ Conflict Handling – What If Two Users Act at the Same Time?

This feature makes sure the app handles **multiple people using it at the same time** smoothly, especially when they’re editing or updating tasks.

### 🔒 My Approach:

1. **Each user has their own session**  
   When someone logs in, they get a unique token (JWT). This helps the system know **exactly which user is doing what**, even if multiple tabs are open.

2. **Live updates using sockets**  
   I used **Socket.IO** so that whenever a task is added, updated, or deleted, all users’ boards update in real-time without needing a refresh.

3. **Clear activity log**  
   Every action is saved with the user’s name and profile. So, we can always see who did what and when in the Activity Log.

4. **Latest data always wins**  
   Even if two users update the same task at almost the same time, the server always uses the **latest version** of the task, so changes don’t clash or get lost.

---

### 🔍 Example:

> Let’s say two users – Aditi and Shreya – both try to update Task X at the same time.

- Aditi changes the title, and Shreya changes the status.
- Each update triggers a real-time event.
- Everyone’s board gets refreshed with the **most up-to-date version** of the task.
- The changes don’t overwrite each other, and no data gets lost.

---

## ✅ Final Thoughts

- **Smart Assign** keeps workload balanced among users.
- **Conflict Handling** ensures everyone can work together smoothly, even in real time.

These two features help make the board collaborative, efficient, and easy to use for teams.
