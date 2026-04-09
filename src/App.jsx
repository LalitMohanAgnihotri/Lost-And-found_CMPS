import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Routes, Route } from "react-router-dom";
import ToastProvider from "./components/common/ToastProvider";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/user/Home";
import Lost from "./pages/user/Lost";
import Found from "./pages/user/Found";
import ReportLost from "./pages/user/ReportLost";
import ReportFound from "./pages/user/ReprotFound";
import Search from "./pages/user/Search";
import Claim from "./pages/user/Claim";
import ProfilePage from "./pages/user/Profile";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Claims from "./pages/admin/Claims";
import Users from "./pages/admin/Users";
import UserProfile from "./pages/admin/UserProfile";
import Items from "./pages/admin/Items";

import "./App.css";

const App = () => {
  return (
    <>
      {/* ✅ FIXED POSITION */}
      <ToastProvider />

      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/lost-items" element={<Lost />} />
          <Route path="/found-items" element={<Found />} />
          <Route path="/search" element={<Search />} />

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

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserProfile />} />
          <Route path="items" element={<Items />} />
          <Route path="claims" element={<Claims />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;