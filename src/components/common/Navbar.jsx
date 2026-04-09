import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import Profile from "../common/ProfileDropdown.";
import NotificationDropdown from "./NotificationDropdown";
import {
  getNotifications,
  markAllRead,
} from "../../api/notification";

import "../../styles/navbar.css";

const Navbar = ({
  type = "user",
  showSearch = true,
  toggleSidebar,
  isOpen,
}) => {
  const [search, setSearch] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [hasNotif, setHasNotif] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = type === "admin";

  // 🔔 REAL-TIME CHECK
  useEffect(() => {
    const fetchNotif = async () => {
      const data = await getNotifications();
      const unread = data.filter((n) => !n.read);
      setHasNotif(unread.length > 0);
    };

    fetchNotif();

    const interval = setInterval(fetchNotif, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 MARK READ
  useEffect(() => {
    if (showNotif) {
      markAllRead();
      setHasNotif(false);
    }
  }, [showNotif]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/search?q=${search}`);
      setSearch("");
    }
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <button
          className={`menu-btn ${isOpen ? "active" : ""}`}
          onClick={toggleSidebar}
        >
          ☰
        </button>

        {/* ✅ BRAND RESTORED */}
        <Link to={isAdmin ? "/admin/dashboard" : "/"} className="brand">
          <img src="/images/logo.png" className="brand-icon" />

          <h4 className="brand-text">
            <span className="brand-lost">Lost</span>
            <span className="brand-and"> & </span>
            <span className="brand-found">Found</span>
          </h4>
        </Link>
      </div>

      {showSearch && !isAdmin && (
        <div className="nav-search">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search..."
          />
        </div>
      )}

      <div className="nav-right">
        <div className="notif-wrapper">
          <button
            className="notification-btn"
            onClick={() => setShowNotif(!showNotif)}
          >
            <Bell size={20} />
            {hasNotif && <span className="dot-indicator"></span>}
          </button>

          {showNotif && (
            <NotificationDropdown
              close={() => setShowNotif(false)}
              isAdmin={isAdmin}
            />
          )}
        </div>

        <Profile />
      </div>
    </header>
  );
};

export default Navbar;