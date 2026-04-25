import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ToastProvider from "./components/common/ToastProvider";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import RoleRedirect from "./components/RoleRedirect";

import "./App.css";

// 🔥 Lazy Loaded Pages
const Home = lazy(() => import("./pages/user/Home"));
const Lost = lazy(() => import("./pages/user/Lost"));
const Found = lazy(() => import("./pages/user/Found"));
const ReportLost = lazy(() => import("./pages/user/ReportLost"));
const ReportFound = lazy(() => import("./pages/user/ReprotFound"));
const Search = lazy(() => import("./pages/user/Search"));
const Claim = lazy(() => import("./pages/user/Claim"));
const ProfilePage = lazy(() => import("./pages/user/Profile"));

const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const Claims = lazy(() => import("./pages/admin/Claims"));
const Users = lazy(() => import("./pages/admin/Users"));
const UserProfile = lazy(() => import("./pages/admin/UserProfile"));
const Items = lazy(() => import("./pages/admin/Items"));

// 🔥 Simple Loader
const PageLoader = () => (
  <div className="text-center py-5">
    <div className="spinner-border text-dark"></div>
  </div>
);

const App = () => {
  return (
    <>
      <ToastProvider />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ROOT */}
          <Route path="/" element={<RoleRedirect />} />

          {/* USER */}
          <Route
            element={
              <ProtectedRoute>
                <UserRoute>
                  <UserLayout />
                </UserRoute>
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/lost-items" element={<Lost />} />
            <Route path="/found-items" element={<Found />} />
            <Route path="/search" element={<Search />} />
            <Route path="/report-lost" element={<ReportLost />} />
            <Route path="/report-found" element={<ReportFound />} />
            <Route path="/claim/:type/:id" element={<Claim />} />
            <Route path="/profile" element={<ProfilePage />} />
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
      </Suspense>
    </>
  );
};

export default App;
