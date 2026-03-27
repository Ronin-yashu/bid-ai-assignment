# YSP — Yuva Shakti Party Platform
## Technical Documentation

> **Assignment:** Bid.ai Web Developer Internship Technical Assignment  
> **Platform:** Full-stack mini module — Jobs & Applications  
> **Stack:** React + Node.js + PostgreSQL  

---

## 🔗 Live URLs

| | URL |
|---|---|
| 🌐 **Frontend** | [https://bid-ai-assignment.vercel.app](https://bid-ai-assignment.vercel.app) |
| 🚀 **Backend API** | [https://bid-ai-assignment.onrender.com](https://bid-ai-assignment.onrender.com) |
| 💯 **Health Check** | [https://bid-ai-assignment.onrender.com/health](https://bid-ai-assignment.onrender.com/health) |
| 💻 **GitHub Repo** | [https://github.com/Ronin-yashu/bid-ai-assignment](https://github.com/Ronin-yashu/bid-ai-assignment) |

---

## 📦 Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | React | 19.x | UI Library |
| **Frontend** | Vite | 5.x | Build Tool & Dev Server |
| **Frontend** | TailwindCSS | 4.x | Utility-first CSS |
| **Frontend** | React Router DOM | 7.x | Client-side routing |
| **Frontend** | TanStack React Query | 5.x | Server state & caching |
| **Frontend** | Zustand | 5.x | Global client state (auth) |
| **Frontend** | Axios | 1.x | HTTP client |
| **Frontend** | Lucide React | latest | Icon library |
| **Frontend** | React Hot Toast | 2.x | Notifications |
| **Backend** | Node.js | ≥18 | Runtime |
| **Backend** | Express | 4.x | Web framework |
| **Backend** | PostgreSQL | 16 | Relational database |
| **Backend** | pg (node-postgres) | 8.x | PostgreSQL client |
| **Backend** | jsonwebtoken | 9.x | JWT auth tokens |
| **Backend** | bcryptjs | 2.x | Password hashing |
| **Backend** | helmet | 7.x | Security headers |
| **Backend** | cors | 2.x | Cross-origin requests |
| **Backend** | express-rate-limit | 7.x | Rate limiting |
| **Backend** | compression | 1.x | Response compression |
| **Backend** | morgan | 1.x | HTTP request logging |
| **DevOps** | Docker Compose | latest | PostgreSQL local dev |
| **Hosting** | Vercel | — | Frontend deployment |
| **Hosting** | Render | — | Backend + PostgreSQL |

---

## 🗂️ Project Structure

```
bid-ai-assignment/
├── frontend/
│   └── src/
│       ├── components/        # Navbar, Footer, ProtectedRoute, NotificationToast
│       ├── pages/             # HomePage, CareersPage, AdminPage, LoginPage, ProfilePage...
│       ├── store/authStore.js # Zustand auth store (persisted to localStorage)
│       ├── lib/api.js         # Axios instance with JWT interceptor + auto-logout on 401
│       └── App.jsx            # Route definitions + protected/admin guards
├── backend/
│   └── src/
│       ├── controllers/       # authController, jobsController, applicationsController
│       ├── routes/            # auth.js, jobs.js, applications.js
│       ├── middleware/        # auth.js (verifyToken, requireAdmin), errorHandler.js, validate.js
│       ├── db/                # pool.js (SSL-aware), schema.sql, init.js (auto table creation)
│       └── index.js           # Express entry — CORS whitelist, rate limiting, route mounting
├── docs/
│   ├── er_diagram.html
│   ├── flow_diagram.html
│   └── TECHNICAL_DOCS.md
├── postman/
│   └── YSP_API_Collection.postman_collection.json
├── docker-compose.yml
└── backend/render.yaml
```

---

## 🔌 API Endpoints

### ✅ Assignment Required Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/job/create` | Bearer JWT | Create new job listing |
| `GET` | `/api/get/jobs` | None | Fetch all active jobs |
| `POST` | `/api/application/submit` | None | Submit a job application |
| `GET` | `/api/get/applications` | None | Fetch all applications |
| `GET` | `/api/application/:id` | None | Fetch specific application by ID |

### Additional Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | None | Register new user |
| `POST` | `/api/auth/login` | None | Login, returns JWT |
| `GET` | `/api/auth/profile` | Bearer JWT | Get current user profile |
| `POST` | `/api/auth/register-admin` | admin_secret | Create admin account |
| `DELETE` | `/api/get/jobs/:id` | Bearer JWT | Soft-delete a job |
| `PATCH` | `/api/application/:id/status` | Admin JWT | Update application status |
| `GET` | `/api/application/stats` | Admin JWT | Get counts by status |
| `GET` | `/health` | None | Health check |

---

## 🗄️ Database Schema

### users
```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### jobs
```sql
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  department VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  type VARCHAR(50) DEFAULT 'Full-time',
  description TEXT,
  requirements TEXT,
  posted_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active);
```

### applications
```sql
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  city_state VARCHAR(100),
  education VARCHAR(200),
  area_of_interest VARCHAR(100),
  why_join TEXT,
  status VARCHAR(30) DEFAULT 'pending'
    CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
```

---

## 🔐 Authentication Flow

1. User submits credentials via `POST /api/auth/login`
2. Backend queries DB for user by email
3. `bcryptjs.compare()` verifies password against hash
4. On success, JWT signed with `JWT_SECRET` (expires 7 days)
5. Frontend stores JWT + user in Zustand (persisted via localStorage)
6. Every protected request sends `Authorization: Bearer <token>`
7. `verifyToken` middleware decodes + validates JWT on each request
8. `requireAdmin` middleware checks `user.role === 'admin'`
9. On 401 response, Axios interceptor auto-logouts + redirects to `/login`

---

## 📋 Assignment API Checklist

| # | Assignment Requirement | Endpoint | Status |
|---|----------------------|----------|--------|
| 1 | POST /job/create | `POST /api/job/create` | ✅ |
| 2 | GET /get/jobs | `GET /api/get/jobs` | ✅ |
| 3 | POST /application/submit | `POST /api/application/submit` | ✅ |
| 4 | GET /get/applications | `GET /api/get/applications` | ✅ |
| 5 | GET /applications/:id | `GET /api/application/:id` | ✅ |

---

## 🛡️ Security Measures

| Measure | Implementation |
|---------|---------------|
| Password hashing | bcryptjs (cost factor 12) |
| JWT tokens | 7-day expiry, HS256 |
| Rate limiting | 100 req/15min general, 10/15min auth |
| Security headers | helmet.js |
| CORS | Whitelisted to Vercel URL + localhost only |
| SQL injection prevention | Parameterized queries (pg) |
| Response compression | compression middleware |
| SSL DB connection | Enabled in production (Render) |

---

## 🌐 Frontend Architecture

- **Server State:** TanStack React Query (caching, background refetch, stale-while-revalidate)
- **Client State:** Zustand with persist middleware (auth token + user saved in localStorage)
- **API Integration:** Axios instance — request interceptor attaches JWT, response interceptor auto-logout on 401
- **Routing:** Public / Protected (JWT required) / Admin (role=admin required)
- **Auth Guard:** Already-logged-in users visiting `/login` are redirected to `/` or `/admin`
- **Pages:** HomePage, CareersPage, PostJobPage, AdminPage, LoginPage, ProfilePage, AboutPage, MembershipPage, YspTvPage, MediaPage, TransparencyPage

---

## 📋 Key Design Decisions

1. **Soft Delete for Jobs** — `is_active=false` preserves application foreign key references
2. **Duplicate Guard** — `(email, job_id)` check prevents double submissions
3. **General Applications** — `job_id` nullable, applicants can apply without a specific role
4. **UUID PKs** — `gen_random_uuid()` on all tables (non-enumerable, secure)
5. **Connection Pooling** — `pg.Pool` with max 20 connections, SSL in production
6. **React Query Caching** — 5-min stale time, minimises redundant API calls
7. **Dual Route Mounting** — Job create at `/api/job/create` (spec) + `/api/get/jobs` (GET, frontend); Applications list at `/api/get/applications` (spec) + `/api/application/` (frontend)
8. **Auto DB Init** — `initDB()` runs `CREATE TABLE IF NOT EXISTS` on every server start, safe for Render cold starts

---

## 🚀 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/ysp_db
JWT_SECRET=your_super_secret_key_here_min_32_chars
JWT_EXPIRES_IN=7d
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
ADMIN_SECRET=your_admin_secret_here
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Production (Render + Vercel)
```env
# Render
DATABASE_URL=<internal render postgres url>
JWT_SECRET=<random 32+ char string>
FRONTEND_URL=https://bid-ai-assignment.vercel.app
NODE_ENV=production
ADMIN_SECRET=<your secret>

# Vercel
VITE_API_URL=https://bid-ai-assignment.onrender.com/api
```

---

## 🏃 Quick Start (Local)

```bash
# 1. Clone
git clone https://github.com/Ronin-yashu/bid-ai-assignment.git
cd bid-ai-assignment

# 2. Start PostgreSQL
docker-compose up -d

# 3. Start Backend
cd backend
cp .env.example .env   # fill in values
npm install
npm run dev            # http://localhost:5000

# 4. Start Frontend
cd ../frontend
npm install
npm run dev            # http://localhost:5173
```

---

*Built by Yash · Bid.ai Web Developer Internship Assignment · March 2026*
