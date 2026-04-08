import { useState, useEffect } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

import "../styles/layout.css";

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
        <Navbar
          type="admin"
          showSearch={false}
          toggleSidebar={() => setOpen((prev) => !prev)}
          isOpen={open}   // ✅ IMPORTANT
        />

        <div className="content">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;