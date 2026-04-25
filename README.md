# AI Tools Directory

A full-stack AI Tools Directory website built with React, Node.js, Express, and MongoDB.

## Tech Stack

- **Frontend**: React.js + Tailwind CSS v4 (Vite)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)

## Features

- 🔍 Search and filter AI tools by category, pricing, and rating
- 🌙 Dark/Light mode toggle
- ⭐ Tool ratings and reviews
- 📝 Submit new AI tools for review
- 🔐 Admin panel with JWT authentication
- 📱 Fully responsive design
- 🔖 Bookmark/Save tools (localStorage)
- 📋 Copy tool URLs
- 🏆 Tool of the Day highlight

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### 1. Backend Setup

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and update values:
```bash
cp .env.example .env
```

Seed the database with 20 AI tools:
```bash
npm run seed
```

Start the backend:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Access the app

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Admin Login: username: `admin`, password: `admin123`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tools | Get all tools (with pagination, filter, sort) |
| GET | /api/tools/:id | Get single tool by ID or slug |
| GET | /api/tools/search?q= | Search tools |
| GET | /api/tools/category/:name | Get tools by category |
| GET | /api/categories | Get all categories |
| POST | /api/tools | Add new tool (admin only) |
| PUT | /api/tools/:id | Update tool (admin only) |
| DELETE | /api/tools/:id | Delete tool (admin only) |
| POST | /api/submit | Submit tool for review |
| POST | /api/auth/login | Admin login |
| POST | /api/newsletter | Newsletter signup |

## Folder Structure

```
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── api.js
│   └── index.html
└── README.md
```

## Admin Credentials

- Username: `admin`
- Password: `admin123`
