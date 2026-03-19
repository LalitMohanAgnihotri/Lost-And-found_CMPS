import { NavLink } from "react-router-dom";
import "../../styles/adminSidebar.css";

const AdminSidebar = ({ closeSidebar }) => {

  const getLinkClass = ({ isActive }) =>
    isActive ? "link active" : "link";

  const handleClick = () => {
    // close sidebar on mobile when clicking link
    closeSidebar && closeSidebar();
  };

  return (
    <div className="admin-sidebar">
      <nav>
        <p className="section-title">MAIN</p>
        <NavLink to="/admin/dashboard" className={getLinkClass} onClick={handleClick}>
          🏠 Dashboard
        </NavLink>

        <p className="section-title">MANAGEMENT</p>
        <NavLink to="/admin/users" className={getLinkClass} onClick={handleClick}>
          👤 Users
        </NavLink>

        <NavLink to="/admin/items" className={getLinkClass} onClick={handleClick}>
          📦 Items
        </NavLink>

        <NavLink to="/admin/claims" className={getLinkClass} onClick={handleClick}>
          📩 Claim Requests
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;