import { useState, useEffect } from "react";
import Sidebar from "../components/user/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
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
      {/* Overlay */}
      {open && isMobile && (
        <div className="overlay" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`sidebar-wrapper ${open ? "open" : ""}`}>
        <Sidebar closeSidebar={() => setOpen(false)} />
      </div>

      {/* Main */}
      <div className="main-section">
        <Navbar
          type="user"
          showSearch={true}
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

export default UserLayout;