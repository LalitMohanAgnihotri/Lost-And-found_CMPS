import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Lost from "./pages/Lost";
import Found from "./pages/Found";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReprotFound";
import Claim from "./pages/Claim";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./App.css";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <Routes>
        {/* 🔓 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/lost-items" element={<Lost />} />
        <Route path="/found-items" element={<Found />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/report-lost"
          element={
            <ProtectedRoute>
              <ReportLost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report-found"
          element={
            <ProtectedRoute>
              <ReportFound />
            </ProtectedRoute>
          }
        />
        <Route
        path="/claim/:type/:id"
        element={
          <ProtectedRoute>
            <Claim />
          </ProtectedRoute>
        }
      />
      </Routes>
      

      <Footer />
    </>
  );
};

export default App;
