# 🏗️ YSP — Yuva Shakti Party Platform

> **Bid.ai Web Developer Internship Assignment** — Full-stack mini module built with React + Node.js + PostgreSQL

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://postgresql.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

## 🔗 Live Demo

| | URL |
|---|---|
| 🌐 **Frontend** | [https://bid-ai-assignment.vercel.app](https://bid-ai-assignment.vercel.app) |
| 🚀 **Backend API** | [https://bid-ai-assignment.onrender.com](https://bid-ai-assignment.onrender.com) |
| 💯 **Health Check** | [https://bid-ai-assignment.onrender.com/health](https://bid-ai-assignment.onrender.com/health) |

---

## ✨ Features

### Frontend
- 🎨 **Pixel-perfect UI** matching Figma design (orange #FF6B2B brand)
- 📱 **Fully responsive** — mobile, tablet, desktop
- 🔐 **Auth flow** — Login + Register with JWT persistence
- 💼 **Job Listings** — Fetched live from API, filter by department
- 📋 **Application Form** — Submit applications with validation
- ⚡ **Admin Dashboard** — Manage jobs & applications with status updates
- 🚦 **Protected Routes** — Role-based access control

### Backend
- 🛡️ **RESTful API** with Express.js
- 🖼️ **PostgreSQL** with connection pooling
- 🔒 **JWT Authentication** + bcrypt password hashing
- 🚦 **Rate limiting** — 100 req/15min general, 10/15min auth
- 🔥 **Security headers** via helmet
- 🌍 **CORS** whitelisted to Vercel production + localhost

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- Docker & Docker Compose

### 1. Clone
```bash
git clone https://github.com/Ronin-yashu/bid-ai-assignment.git
cd bid-ai-assignment
```

### 2. Start Database
```bash
docker compose up -d
```

### 3. Start Backend
```bash
cd backend
cp .env.example .env   # fill in your values
npm install
npm run dev
# → http://localhost:5000
```

### 4. Start Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## 🔌 API Endpoints

### ✅ Assignment Required Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/job/create` | JWT | Create job listing |
| `GET` | `/api/get/jobs` | — | Fetch all active jobs |
| `POST` | `/api/application/submit` | — | Submit application |
| `GET` | `/api/get/applications` | — | Fetch all applications |
| `GET` | `/api/application/:id` | — | Get application by ID |

### Additional Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | — | Register user |
| `POST` | `/api/auth/login` | — | Login → JWT |
| `GET` | `/api/auth/profile` | JWT | Get profile |
| `DELETE` | `/api/get/jobs/:id` | JWT | Remove job |
| `PATCH` | `/api/application/:id/status` | Admin | Update status |
| `GET` | `/api/application/stats` | Admin | Stats overview |

---

## 📁 Project Structure

```
bid-ai-assignment/
├── frontend/          # React + Vite + TailwindCSS
├── backend/           # Node.js + Express + PostgreSQL
├── docs/
│   ├── er_diagram.html
│   ├── flow_diagram.html
│   └── TECHNICAL_DOCS.md
├── postman/
│   └── YSP_API_Collection.postman_collection.json
└── docker-compose.yml
```

---

## 🗄️ Database Schema

Three tables: **users** → **jobs** → **applications**

See [`docs/er_diagram.html`](docs/er_diagram.html) for visual ER diagram.

---

## 📋 Postman Collection

Import `postman/YSP_API_Collection.postman_collection.json`:
- All 5 assignment-required endpoints clearly marked with ✅
- Auto-sets `token`, `job_id`, `application_id` via test scripts
- Change `base_url` variable to `https://bid-ai-assignment.onrender.com/api` for production testing

---

## 📚 Documentation

- **Technical Docs:** [`docs/TECHNICAL_DOCS.md`](docs/TECHNICAL_DOCS.md)
- **ER Diagram:** [`docs/er_diagram.html`](docs/er_diagram.html)
- **Flow Diagram:** [`docs/flow_diagram.html`](docs/flow_diagram.html)
- **Postman Collection:** [`postman/YSP_API_Collection.postman_collection.json`](postman/YSP_API_Collection.postman_collection.json)

---

## 🛠️ Tech Stack

**Frontend:** React 19, Vite, TailwindCSS 4, React Router v7, TanStack Query, Zustand, Axios  
**Backend:** Node.js, Express, PostgreSQL, JWT, bcryptjs, Helmet, CORS  
**Hosting:** Vercel (frontend) + Render (backend + PostgreSQL)  

---

*Built for Bid.ai Internship Assignment · March 2026*
