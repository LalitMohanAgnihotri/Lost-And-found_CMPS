import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserRoute = ({ children }) => {
  const { user } = useAuth();

  // if admin tries to access user routes
  if (user?.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default UserRoute;