# 🔍 Lost & Found System (MERN Stack)

A full-stack **Lost & Found Management System** built using the MERN stack, designed to help users report lost items, find matching items, and manage claims with real-time notifications and email alerts.

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

* Dashboard to manage:

  * Users
  * Items
  * Claims
* Approve / Reject claims
* Receive notifications for:

  * New claim requests
* Automatically resolve items after approval

---

## 🔔 Notification System (Core Feature)

* Real-time-like notification system (polling-based)
* Types:

  * `match` → when found item matches lost item
  * `claim` → claim request / approval / rejection
* Features:

  * 🔴 Unread indicator (dot)
  * Mark all as read
  * Filter tabs (All / Claims / Matches)
  * Admin-specific "Claim Requests"

---

## 📧 Email System

* Automated emails using Nodemailer
* Triggers:

  * Match found
  * Claim approved / rejected

---

# 🧠 Smart Matching Logic

* Matches based on:

  * Item name
  * Location
* Prevents duplicate notifications
* Works instantly when a found item is reported

---

# 🏗️ Tech Stack

## Frontend

* React.js
* React Router
* Axios
* Tailwind / Custom CSS
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

```
Server/
│── models/
│   ├── Users.js
│   ├── Lost.js
│   ├── Found.js
│   ├── Claim.js
│   ├── Notification.js
│
│── controllers/
│   ├── lost.controller.js
│   ├── found.controller.js
│   ├── claim.controller.js
│   ├── user.controller.js
│
│── services/
│   ├── match.service.js
│   ├── claim.service.js
│
│── routes/
│   ├── auth.routes.js
│   ├── lost.routes.js
│   ├── found.routes.js
│   ├── claim.routes.js
│   ├── notification.routes.js
│
│── config/
│   ├── db.js
│   ├── mail.config.js
│   ├── cloudinary.js
│
│── middlewares/
│   ├── auth.middleware.js
│   ├── upload.middleware.js
│
│── app.js
│── server.js
```

---

## Frontend

```
Client/
│── src/
│   ├── api/
│   │   ├── axios.js
│   │   ├── notification.js
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NotificationDropdown.jsx
│   │   │   ├── ProfileDropdown.jsx
│   │   │
│   │   ├── user/
│   │   ├── admin/
│   │
│   ├── pages/
│   ├── layouts/
│   ├── context/
│   ├── styles/
│
│── App.jsx
│── main.jsx
```

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
git clone https://github.com/your-username/lost-found-system.git
cd lost-found-system
```

---

## 2. Backend Setup

```bash
cd Server
npm install
```

### Create `.env`

```
PORT=3000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

### Run server

```bash
node server.js
```

---

## 3. Frontend Setup

```bash
cd Client
npm install
npm run dev
```

---

# 🧪 Key Learning Outcomes

This project demonstrates:

* 🔄 Full-stack integration (React + Express + MongoDB)
* 🔐 Authentication & authorization (JWT)
* 📡 API design and RESTful architecture
* 🔔 Notification system design
* 📧 Email automation workflows
* 🧠 Backend service abstraction (clean architecture)
* 🧩 State management & UI synchronization
* 🐛 Debugging real-world issues (auth, routes, async bugs)

---

# 🚀 Future Improvements

* 🔴 Real-time notifications using Socket.IO
* 📱 Mobile responsiveness enhancement
* 📊 Admin analytics dashboard
* 🔎 AI-based smart matching
* 🔔 Push notifications

---

# 👨‍💻 Author

**Lalit Agnihotri**

---

# ⭐ If you like this project

Give it a ⭐ on GitHub and feel free to contribute!
