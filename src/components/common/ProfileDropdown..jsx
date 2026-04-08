import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/dropdown.css";
const Profile = () => {
  const { logout, user } = useAuth(); // ✅ get user
  const navigate = useNavigate();

  // ✅ Generate Initials
  const getInitials = (name) => {
    if (!name) return "U";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  return (
    <div className="dropdown">
      <a
        href="#"
        className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        {/* ✅ Initials Avatar */}
        <div className="navbar-avatar">
          {getInitials(user?.name)}
        </div>
      </a>

      <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
        <li className="px-3 py-2">
          <small className="text-muted">Signed in as</small>
          <div className="fw-semibold">{user?.name || "User"}</div>
        </li>

        <li><hr className="dropdown-divider" /></li>

        <li>
          <button
            onClick={() => navigate("/profile")}
            className="dropdown-item"
          >
            Profile
          </button>
        </li>

        <li><hr className="dropdown-divider" /></li>

        <li>
          <button
            onClick={logout}
            className="dropdown-item text-danger"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;