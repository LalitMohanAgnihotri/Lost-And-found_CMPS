import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { logout } = useAuth();

  return (
    <div className="dropdown">
      <a
        href="#"
        className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        <img
          src="https://github.com/mdo.png"
          alt="user"
          width="32"
          height="32"
          className="rounded-circle"
        />
      </a>

      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <button
            onClick={logout}
            className="dropdown-item text-danger"
            type="button"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;