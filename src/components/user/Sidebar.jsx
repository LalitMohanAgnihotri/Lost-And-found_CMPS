import { NavLink } from "react-router-dom";
import "../../styles/sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          onClick={toggleSidebar}
        />
      )}

      <div
        className="sidebar"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <h4 className="sidebar-title">Dashboard</h4>
        <hr />

        <ul className="sidebar-nav">
          <li>
            <NavLink to="/" onClick={toggleSidebar}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/lost-items" onClick={toggleSidebar}>
              Lost Items
            </NavLink>
          </li>

          <li>
            <NavLink to="/found-items" onClick={toggleSidebar}>
              Found Items
            </NavLink>
          </li>

          <li>
            <NavLink to="/report-lost" onClick={toggleSidebar}>
              Report Lost
            </NavLink>
          </li>

          <li>
            <NavLink to="/report-found" onClick={toggleSidebar}>
              Report Found
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
