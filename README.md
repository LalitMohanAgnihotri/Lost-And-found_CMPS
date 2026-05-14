# 🔍 Lost & Found System (MERN Stack)

A full-stack **Lost & Found Management System** built using the MERN stack, designed to help users report lost items, find matching items, and manage claims with notifications and admin moderation.

Built with production-focused practices including validation, Redis caching/OTP, security middleware, protected routes, lazy loading, and admin analytics dashboard.

---

# 🚀 Features

## 👤 User Features

- Report lost items with image upload
- Report found items
- Search items using keyword/location
- Claim found items with proof
- Track:
  - Lost items
  - Found items
  - Claim status (Pending / Approved / Rejected)

### 🔐 Authentication & Security

- JWT-based login/signup
- Role-based access (USER / ADMIN)
- Protected routes (frontend + backend)
- Request validation using Zod
- Rate limiting for auth / OTP / claims
- Secure headers with Helmet
- HPP protection
- Controlled CORS allowlist

### 🔑 Forgot Password Flow

- Email-based OTP verification
- 6-digit OTP system
- OTP stored in Redis (Upstash)
- Auto expiry using TTL
- Secure password reset flow

---

## 🧑‍💼 Admin Features

### 📊 Dashboard

- Overview of:
  - Total Lost Items
  - Total Found Items
  - Total Claims

### 📈 Data Visualization

- 📊 Bar Chart → Claims Overview
- 🍩 Donut Chart → Claims Distribution

### 🧾 Claim Management

- View claim requests
- Detailed modal with:
  - Item details
  - User info
  - Proof message

- Actions:
  - ✅ Approve
  - ❌ Reject

---

## 🔔 Notification System

- Polling-based real-time notifications

### Types:
- `match` → when found item matches lost item
- `claim` → claim request / approval / rejection

### Features:
- 🔴 Unread indicator
- Mark all as read
- Filter tabs (All / Claims / Matches)

---

## 📧 Email System

- Automated emails using Nodemailer

### Triggers:
- Match found
- Claim approved / rejected
- 🔑 Password reset OTP (NEW)

---

## 🧠 Smart Matching Logic

- Based on:
  - Item name
  - Location
- Prevents duplicate notifications

---

## 🎨 UI / UX Highlights

- Modern card-based UI
- Responsive layout
- Interactive charts
- Smooth animations
- Role-based rendering

---

## ⚡ Performance Optimizations

- Lazy loaded routes
- Debounced search inputs
- Skeleton loaders
- Better loading states
- Optimized first page load

# 🏗️ Tech Stack

## Frontend

- React.js
- React Router
- Axios
- Recharts
- Lucide Icons

## Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- Redis (Upstash)

## Security

- Helmet
- HPP
- Zod Validation
- Express Rate Limit

## Tools

- Cloudinary
- Multer
- Nodemailer
- JWT
- Socket.IO

---

# 📁 Project Structure

## Backend

```bash
Server/
├── models/
│   ├── Users.js
│   ├── Lost.js
│   ├── Found.js
│   ├── Claim.js
│   ├── Notification.js
│
├── controllers/
│   ├── auth.controller.js   
│   ├── lost.controller.js
│   ├── found.controller.js
│   ├── claim.controller.js
│   ├── user.controller.js
│
├── services/
│   ├── match.service.js
│   ├── claim.service.js
│
├── routes/
│   ├── auth.routes.js       
│   ├── lost.routes.js
│   ├── found.routes.js
│   ├── claim.routes.js
│   ├── notification.routes.js
│
├── config/
│   ├── db.js
│   ├── mail.config.js
│   ├── cloudinary.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── upload.middleware.js
│
├── app.js
└── server.js

src/
│   ├── api/
│   │   ├── axios.js
│   │   ├── notification.js
│
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NotificationDropdown.jsx
│   │   │   ├── ProfileDropdown.jsx
│   │
│   │   ├── admin/
│   │   ├── user/
│   │   ├── AdminClaimCard.jsx
│   │   ├── ClaimDetailsModal.jsx
│   │   ├── ClaimsChart.jsx
│   │   ├── ClaimsPieChart.jsx
│   │   ├── StatsCard.jsx
│
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── ForgotPassword.jsx  # NEW
│
│   ├── layouts/
│   ├── context/
│   ├── styles/
│
├── App.jsx
└── main.jsx

⚙️ Setup Instructions

1. Clone Repo
git clone https://github.com/LalitMohanAgnihotri/Lost-And-found_CMPS
cd Lost-And-found_CMPS

2. Backend Setup
cd Server
npm install

Create .env
PORT=3000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
CLIENT_URLS=http://localhost:5173

EMAIL_USER=your_email
EMAIL_PASS=your_app_password

CLOUD_NAME=your_cloudinary
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

REDIS_URL=your_upstash_url
USER_ID=optional_if_used

node server.js

3. Frontend Setup
cd Client
npm install
npm run dev

## 🧪 Key Learnings

- Full MERN stack architecture
- JWT authentication & role guards
- Redis OTP workflow with TTL
- Route protection
- Real-time updates using Socket.IO
- Backend security hardening
- Request validation with Zod
- File uploads with Cloudinary
- Performance optimization in React
- Production-ready project structuring


## 🚀 Future Improvements

- Full mobile responsiveness audit
- Pagination for large datasets
- Advanced filters & sorting
- Better admin analytics
- Search result caching with Redis
- Realtime notifications for all events
- UI polish & animations

## 🌐 Deployment

Frontend: Vercel  
Backend: Render / Railway / Node Server  
Database: MongoDB Atlas  
Redis: Upstash

👨‍💻 Author
Lalit Mohan Agnihotri

⭐ If you like this project, give it a star!