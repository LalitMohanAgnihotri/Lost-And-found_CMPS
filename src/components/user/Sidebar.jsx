import { NavLink } from "react-router-dom";
import "../../styles/adminSidebar.css";

const Sidebar = ({ closeSidebar }) => {
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

        <NavLink to="/" className={getLinkClass} onClick={handleClick}>
          <span>🏠</span> Home
        </NavLink>

        {/* ITEMS */}
        <p className="section-title">ITEMS</p>

        <NavLink to="/lost-items" className={getLinkClass} onClick={handleClick}>
          <span>📦</span> Lost Items
        </NavLink>

        <NavLink to="/found-items" className={getLinkClass} onClick={handleClick}>
          <span>📦</span> Found Items
        </NavLink>

        {/* REPORT */}
        <p className="section-title">REPORT</p>

        <NavLink to="/report-lost" className={getLinkClass} onClick={handleClick}>
          <span>📝</span> Report Lost
        </NavLink>

        <NavLink to="/report-found" className={getLinkClass} onClick={handleClick}>
          <span>📝</span> Report Found
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;