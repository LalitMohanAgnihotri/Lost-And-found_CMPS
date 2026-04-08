import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Profile from "../common/ProfileDropdown.";
import NotificationDropdown from "./NotificationDropdown";

import "../../styles/navbar.css";

const Navbar = ({
  type = "user",
  showSearch = true,
  toggleSidebar,
  isOpen,
}) => {
  const [search, setSearch] = useState("");
  const [showNotif, setShowNotif] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  const loggedIn = !!user;
  const isAdmin = type === "admin";

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/search?q=${search}`);
      setSearch("");
    }
  };

  return (
    <header className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <button
          className={`menu-btn d-lg-none ${isOpen ? "active" : ""}`}
          onClick={toggleSidebar}
        >
          ☰
        </button>

        <Link to={isAdmin ? "/admin/dashboard" : "/"} className="brand">
          <img src="/images/logo.png" alt="Logo" className="brand-icon" />
          <h4 className="brand-text">
            <span className="brand-lost">Lost</span>
            <span className="brand-and"> & </span>
            <span className="brand-found">Found</span>
          </h4>
        </Link>
      </div>

      {/* SEARCH */}
      {showSearch && !isAdmin && (
        <div className="nav-search">
          <input
            type="search"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      )}

      {/* RIGHT */}
      <div className="nav-right">
        {loggedIn ? (
          <>
            {/* 🔔 NOTIFICATION */}
            <div className="notif-wrapper">
              <button
                className="icon-btn notification-btn"
                onClick={() => setShowNotif(!showNotif)}
              >
                🔔
                <span className="dot-indicator"></span>
              </button>

              {showNotif && (
                <NotificationDropdown
                  close={() => setShowNotif(false)}
                />
              )}
            </div>

            <Profile />
          </>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;