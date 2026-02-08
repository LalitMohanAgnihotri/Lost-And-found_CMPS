import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

import Profile from "./Profile";
import styles from "./Navbar.module.css";

const Navbar = ({ toggleSidebar }) => {
  const [searchMode, setSearchMode] = useState(false);
  const loggedIn = isLoggedIn();

  return (
    <header className={`navbar ${styles.navbar}`}>
      {/* LEFT */}
      {!searchMode && (
        <div className={styles.brand}>
          <button
            className="btn btn-outline-dark d-lg-none"
            onClick={toggleSidebar}
          >
            ☰
          </button>

          {/* LOGO + BRAND */}
          <Link
            to="/"
            className="text-decoration-none d-flex align-items-center gap-2"
          >
            <div className={styles.brandLogo}>
              <img src="/images/logo.png" alt="Logo" />
            </div>

            <div className={styles.brandName}>
              <h4 className={styles.brandNameM}>Lost</h4>
              <h4 className={styles.brandNameA}>&</h4>
              <h4 className={styles.brandNameM}>Found</h4>
            </div>
          </Link>
        </div>
      )}

      {/* NAV LINKS (DESKTOP) */}
      {!searchMode && (
        <ul className={`d-none d-lg-flex ${styles.navLinks}`}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Home
            </NavLink>
          </li>

          <>
            <li>
              <NavLink
                to="/lost-items"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
              >
                Lost Items
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/found-items"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
              >
                Found Items
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/report-lost"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
              >
                Report Lost
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/report-found"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
              >
                Report Found
              </NavLink>
            </li>
          </>
        </ul>
      )}

      {/* MOBILE SEARCH */}
      {searchMode && (
        <div className={styles.mobileSearch}>
          <button
            className="btn btn-outline-dark"
            onClick={() => setSearchMode(false)}
          >
            ←
          </button>
          <input
            type="search"
            className={`form-control ${styles.searchInput}`}
            placeholder="Search items..."
            autoFocus
          />
        </div>
      )}

      {/* DESKTOP SEARCH */}
      {!searchMode && (
        <form className={`d-none d-lg-flex ${styles.searchForm}`}>
          <input
            type="search"
            className={`form-control form-control-sm ${styles.searchInput}`}
            placeholder="Search items..."
          />
        </form>
      )}

      {/* RIGHT ICONS */}
      {!searchMode && (
        <div className={styles.rightIcons}>
          {/* MOBILE SEARCH ICON */}
          <button
            className="btn btn-outline-dark d-lg-none"
            onClick={() => setSearchMode(true)}
          >
            🔍
          </button>

          {loggedIn ? (
            <Profile />
          ) : (
            <Link to="/login" className="btn btn-outline-dark btn-sm">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
