import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // go to public home after logout
  };

  return (
    <div
      style={{
        width: "220px",
        background: "#1f2937",
        color: "white",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <h4>Admin Panel</h4>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/admin/users">Users</NavLink>
        </li>

        <li>
          <NavLink to="/admin/lost">Lost Reports</NavLink>
        </li>

        <li>
          <NavLink to="/admin/found">Found Reports</NavLink>
        </li>

        <hr style={{ borderColor: "#444" }} />

        <li>
          <button
            onClick={handleLogout}
            style={{
              background: "#ef4444",
              border: "none",
              color: "white",
              padding: "8px 12px",
              width: "100%",
              cursor: "pointer",
              borderRadius: "4px"
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;