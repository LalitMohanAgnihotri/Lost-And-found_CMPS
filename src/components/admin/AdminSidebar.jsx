import { NavLink } from "react-router-dom";
import "../../styles/adminSidebar.css";

const AdminSidebar = ({ closeSidebar }) => {
  const getLinkClass = ({ isActive }) =>
    isActive ? "link active" : "link";

  const handleClick = () => {
    closeSidebar && closeSidebar();
  };

  return (
    <div className="admin-sidebar">
      <nav>
        {/* MAIN */}
        <p className="section-title">MAIN</p>

        <NavLink
          to="/admin/dashboard"
          className={getLinkClass}
          onClick={handleClick}
        >
          <span>🏠</span> Dashboard
        </NavLink>

        {/* MANAGEMENT */}
        <p className="section-title">MANAGEMENT</p>

        <NavLink
          to="/admin/users"
          className={getLinkClass}
          onClick={handleClick}
        >
          <span>👤</span> Users
        </NavLink>

        <NavLink
          to="/admin/items"
          className={getLinkClass}
          onClick={handleClick}
        >
          <span>📦</span> Items
        </NavLink>

        <NavLink
          to="/admin/claims"
          className={getLinkClass}
          onClick={handleClick}
        >
          <span>📩</span> Claim Requests
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;