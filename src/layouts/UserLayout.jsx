import { useState, useEffect } from "react";
import Sidebar from "../components/user/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/user/Navbar";
import Footer from "../components/common/Footer";

import "../styles/AdminLayout.css";
const UserLayout = () => {
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
      {/* Overlay (Mobile only) */}
      {open && isMobile && (
        <div className="overlay" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`sidebar-wrapper ${open ? "open" : ""}`}>
        <Sidebar closeSidebar={() => setOpen(false)} />
      </div>

      {/* Main Section */}
      <div className="main-section">
        {/* Navbar (handles toggle + profile + search) */}
        <Navbar toggleSidebar={() => setOpen(!open)} />

        {/* Page Content */}
        <div className="content">
          <Outlet />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;