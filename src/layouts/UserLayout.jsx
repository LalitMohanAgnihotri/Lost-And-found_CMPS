import { Outlet } from "react-router-dom";
import Navbar from "../components/user/Navbar";
import Sidebar from "../components/user/Sidebar";
import Footer from "../components/Footer";
import { useState } from "react";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="container mt-3">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default UserLayout;