# 🔍 Lost & Found System (MERN Stack)

A full-stack **Lost & Found Management System** built using the MERN stack, designed to help users report lost items, find matching items, and manage claims with notifications and admin moderation.

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

### 🔐 Authentication

- JWT-based login/signup
- Role-based access (USER / ADMIN)

### 🔑 Forgot Password 

- Email-based OTP verification
- 6-digit OTP system
- Reset password securely
- Frontend + Backend integrated flow

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

## Tools

- Cloudinary (image upload)
- Multer (file handling)
- Nodemailer (email service)
- JWT (authentication)

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

EMAIL_USER=your_email
EMAIL_PASS=your_app_password

CLOUD_NAME=your_cloudinary
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

node server.js

3. Frontend Setup
cd Client
npm install
npm run dev

🧪 Key Learnings
Full MERN stack integration
JWT authentication
OTP-based password reset
Email automation
Notification system design
UI/UX development
Debugging real-world issues


🚀 Future Improvements
Real-time notifications (Socket.IO)
Advanced search filters
Mobile responsiveness
AI-based matching

👨‍💻 Author
Lalit Mohan Agnihotri

⭐ If you like this project, give it a star!