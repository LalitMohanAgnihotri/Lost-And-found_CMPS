import { useState, useEffect } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import Profile from "../components/user/ProfileDropdown.";
import { Outlet, Link } from "react-router-dom";
import Footer from "../components/common/Footer";

import "../styles/AdminLayout.css";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile) setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="admin-layout">
      {/* Overlay */}
      {open && isMobile && (
        <div className="overlay" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`sidebar-wrapper ${open ? "open" : ""}`}>
        <AdminSidebar closeSidebar={() => setOpen(false)} />
      </div>

      {/* Main */}
      <div className="main-section">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-left">
            {isMobile && (
              <button
                className="toggle-btn"
                onClick={() => setOpen(!open)}
              >
                ☰
              </button>
            )}

            {/* BRAND */}
            <Link to="/admin/dashboard" className="admin-brand">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="brand-icon"
              />

              <h4 className="brand-text">
                <span className="brand-lost">Lost</span>
                <span className="brand-and"> & </span>
                <span className="brand-found">Found</span>
              </h4>
            </Link>
          </div>

          {/* RIGHT */}
          <div className="topbar-right">
            <Profile />
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;