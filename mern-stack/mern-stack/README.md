# 🎓 MERN Stack Student Portfolio Application

**Experiment 6 - Full Stack CRUD Application**

## Tech Stack
- **MongoDB** – NoSQL Database
- **Express.js** – Backend Framework
- **React.js** – Frontend Library
- **Node.js** – JavaScript Runtime

## Architecture
```
React (Frontend :3001) → Express/Node (Backend :3000) → MongoDB (Port 27017)
```

## Folder Structure
```
mern-stack/
├── backend/
│   ├── models/
│   │   └── Student.js         # Mongoose Schema
│   ├── routes/
│   │   └── studentRoutes.js   # CRUD API Routes
│   ├── server.js              # Express Server
│   └── package.json
│
└── frontend/
    └── student-portfolio/
        ├── public/
        │   └── index.html
        ├── src/
        │   ├── components/
        │   │   ├── Navbar.js
        │   │   ├── AddStudent.js    # CREATE
        │   │   ├── ViewStudents.js  # READ + DELETE
        │   │   └── EditStudent.js   # UPDATE
        │   ├── App.js
        │   ├── index.js
        │   └── index.css
        └── package.json
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running locally (or MongoDB Atlas)

---

### Step 1: Start MongoDB
```bash
# On Windows
net start MongoDB

# On Linux/Mac
sudo systemctl start mongod
# OR
mongod
```

---

### Step 2: Setup & Start Backend
```bash
cd backend
npm install
node server.js
```
✅ Backend runs on: `http://localhost:3000`

---

### Step 3: Setup & Start Frontend
```bash
cd frontend/student-portfolio
npm install
npm start
```
✅ Frontend runs on: `http://localhost:3001`

---

## 📡 API Endpoints

| Method | Endpoint                  | Description        |
|--------|---------------------------|--------------------|
| POST   | /student/add              | Add new student    |
| GET    | /student/view             | Get all students   |
| GET    | /student/view/:id         | Get one student    |
| PUT    | /student/update/:id       | Update a student   |
| DELETE | /student/delete/:id       | Delete a student   |

---

## 📋 CRUD Operations Summary

| Operation | Frontend Component | HTTP Method | Route               |
|-----------|--------------------|-------------|---------------------|
| Create    | AddStudent.js      | POST        | /student/add        |
| Read      | ViewStudents.js    | GET         | /student/view       |
| Update    | EditStudent.js     | PUT         | /student/update/:id |
| Delete    | ViewStudents.js    | DELETE      | /student/delete/:id |

---

## Viva Questions & Answers

1. **What is MERN stack?**
   MERN is a JavaScript-based full stack framework using MongoDB (database), Express.js (backend), React (frontend), and Node.js (runtime).

2. **Difference between SQL and NoSQL?**
   SQL uses structured tables with fixed schema; NoSQL (like MongoDB) uses flexible documents (JSON-like) with dynamic schema.

3. **What is REST API?**
   REST (Representational State Transfer) API is an architectural style for building web services using standard HTTP methods (GET, POST, PUT, DELETE).

4. **Role of Express.js?**
   Express.js is a minimal web framework for Node.js that simplifies routing, middleware integration, and HTTP request/response handling.

---

## GitHub Submission
```bash
git init
git add .
git commit -m "MERN stack CRUD student portfolio"
git remote add origin <your-repo-url>
git push -u origin main
```
