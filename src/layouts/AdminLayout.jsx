import { useState, useEffect } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import "../styles/AdminLayout.css";
import Profile from "../components/user/ProfileDropdown.";
import { Outlet } from "react-router-dom";

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
        <div className="topbar">
          {/* Show only mobile */}
          {isMobile && (
            <button className="toggle-btn" onClick={() => setOpen(!open)}>
              ☰
            </button>
          )}

          <h3>Admin Panel</h3>

          <div className="topbar-right">
            <Profile />
          </div>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
