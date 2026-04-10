import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ROUTES
import { Routes, Route } from "react-router-dom";
import ToastProvider from "./components/common/ToastProvider";

// LAYOUTS & COMPONENTS
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Protected Routes
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import RoleRedirect from "./components/RoleRedirect"; 

// USER PAGES
import Home from "./pages/user/Home";
import Lost from "./pages/user/Lost";
import Found from "./pages/user/Found";
import ReportLost from "./pages/user/ReportLost";
import ReportFound from "./pages/user/ReprotFound";
import Search from "./pages/user/Search";
import Claim from "./pages/user/Claim";
import ProfilePage from "./pages/user/Profile";

// AUTH PAGES
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";


// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import Claims from "./pages/admin/Claims";
import Users from "./pages/admin/Users";
import UserProfile from "./pages/admin/UserProfile";
import Items from "./pages/admin/Items";

import "./App.css";

const App = () => {
  return (
    <>
      <ToastProvider />

      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ✅ SMART ROOT ROUTE */}
        <Route path="/" element={<RoleRedirect />} />

        {/* ✅ USER ROUTES */}
        <Route
          element={
            <ProtectedRoute>
              <UserRoute>
                <UserLayout />
              </UserRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} /> {/* ✅ CHANGED */}
          <Route path="/lost-items" element={<Lost />} />
          <Route path="/found-items" element={<Found />} />
          <Route path="/search" element={<Search />} />
          <Route path="/report-lost" element={<ReportLost />} />
          <Route path="/report-found" element={<ReportFound />} />
          <Route path="/claim/:type/:id" element={<Claim />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* ✅ ADMIN ROUTES */}
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
