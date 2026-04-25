import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import useSocket from "../../hooks/useSocket";

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
  const socket = useSocket(user?.id);

  const isAdmin = type === "admin";

  // Initial fetch
  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const data = await getNotifications();
        const unread = data.filter((n) => !n.read);
        setHasNotif(unread.length > 0);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotif();
  }, []);

  // Real-time listener
  useEffect(() => {
    if (!socket) return;

    socket.on("new_notification", () => {
      setHasNotif(true);
    });

    return () => {
      socket.off("new_notification");
    };
  }, [socket]);

  // Mark read
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