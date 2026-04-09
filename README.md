# 🔍 Lost & Found System (MERN Stack)

A full-stack **Lost & Found Management System** built using the MERN stack, designed to help users report lost items, find matching items, and manage claims with notifications and admin moderation.

---

# 🚀 Live Features

## 👤 User Features

* Report lost items with image upload
* Report found items
* Search items using keyword/location
* Claim found items with proof
* Receive:

  * 📧 Email notifications
  * 🔔 In-app notifications (match + claim updates)
* Track:

  * Lost items
  * Found items
  * Claim status (Pending / Approved / Rejected)

---

## 🧑‍💼 Admin Features

### 📊 Admin Dashboard

* Clean and modern dashboard UI
* Overview of:

  * Total Lost Items
  * Total Found Items
  * Total Claims

### 📈 Data Visualization

* 📊 Bar Chart → Claims Overview
* 🍩 Donut Chart → Claims Distribution

### 🧾 Claim Management

* View claim requests in card format
* Open detailed modal with:

  * Item details
  * Claimed by (user info)
  * Proof message

* Actions:

  * ✅ Approve claim
  * ❌ Reject claim

### ⚡ Smart UI Behavior

* Instant UI update after approval/rejection
* Status badges (Pending / Approved / Rejected)
* Role-based UI (no claim button for admin)

---

## 🔔 Notification System (Core Feature)

* Polling-based real-time notification system
* Types:

  * `match` → when found item matches lost item
  * `claim` → claim request / approval / rejection

### Features:

* 🔴 Unread indicator (dot)
* Mark all as read
* Filter tabs (All / Claims / Matches)
* Admin-specific "Claim Requests"

---

## 📧 Email System

* Automated emails using Nodemailer

### Triggers:

* Match found
* Claim approved / rejected

---

# 🧠 Smart Matching Logic

* Matches based on:

  * Item name
  * Location
* Prevents duplicate notifications
* Runs automatically when a found item is reported

---

# 🎨 UI / UX Highlights

* Modern card-based UI
* Responsive grid layout
* Interactive dashboard charts
* Smooth hover effects & animations
* Modal-based workflows for clean UX
* Role-based rendering (User vs Admin)

---

# 🏗️ Tech Stack

## Frontend

* React.js
* React Router
* Axios
* Recharts (Charts)
* Custom CSS (Modern UI)
* Lucide Icons

## Backend

* Node.js
* Express.js
* MongoDB + Mongoose

## Other Tools

* Cloudinary (image upload)
* Multer (file handling)
* Nodemailer (email service)
* JWT (authentication)

---

# 📁 Project Structure

## Backend


Server/
│── models/
│ ├── Users.js
│ ├── Lost.js
│ ├── Found.js
│ ├── Claim.js
│ ├── Notification.js
│
│── controllers/
│ ├── lost.controller.js
│ ├── found.controller.js
│ ├── claim.controller.js
│ ├── user.controller.js
│
│── services/
│ ├── match.service.js
│ ├── claim.service.js
│
│── routes/
│ ├── auth.routes.js
│ ├── lost.routes.js
│ ├── found.routes.js
│ ├── claim.routes.js
│ ├── notification.routes.js
│
│── config/
│ ├── db.js
│ ├── mail.config.js
│ ├── cloudinary.js
│
│── middlewares/
│ ├── auth.middleware.js
│ ├── upload.middleware.js
│
│── app.js
│── server.js


---

## Frontend


Client/
│── src/
│ ├── api/
│ │ ├── axios.js
│ │ ├── notification.js
│ │
│ ├── components/
│ │ ├── common/
│ │ │ ├── Navbar.jsx
│ │ │ ├── NotificationDropdown.jsx
│ │ │ ├── ProfileDropdown.jsx
│ │ │
│ │ ├── user/
│ │ ├── admin/
│ │ ├── AdminClaimCard.jsx
│ │ ├── ClaimDetailsModal.jsx
│ │ ├── ClaimsChart.jsx
│ │ ├── ClaimsPieChart.jsx
│ │ ├── StatsCard.jsx
│
│ ├── pages/
│ ├── layouts/
│ ├── context/
│ ├── styles/
│
│── App.jsx
│── main.jsx


---

# 🔐 Authentication

* JWT-based authentication
* Role-based access:

  * USER
  * ADMIN
* Protected routes (frontend + backend)

---

# ⚙️ Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/LalitMohanAgnihotri/Lost-And-found_CMPS
cd lost-found-system

2. Backend Setup
cd Server
npm install
Create .env
PORT=3000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
Run server
node server.js

3. Frontend Setup
cd Client
npm install
npm run dev
🧪 Key Learning Outcomes

This project demonstrates:

🔄 Full-stack MERN integration
🔐 Authentication & authorization (JWT)
📡 RESTful API design
🔔 Notification system architecture
📧 Email automation workflows
📊 Data visualization with charts
🎨 UI/UX design principles
🧩 State management & async handling
🐛 Debugging real-world issues
🚀 Future Improvements
🔴 Real-time notifications using Socket.IO
📱 Enhanced mobile responsiveness
🔎 Advanced filtering & search
📊 More admin analytics
🤖 AI-based smart matching

👨‍💻 Author
Lalit Agnihotri

If you like this project

Give it a ⭐ on GitHub and feel free to contribute!