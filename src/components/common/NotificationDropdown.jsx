import { useState, useEffect, useRef } from "react";
import { getNotifications } from "../../api/notification";
import "../../styles/notification.css";

const NotificationDropdown = ({ close, isAdmin }) => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const dropdownRef = useRef(null);

  // fetch notifications
  useEffect(() => {
    const fetchData = async () => {
      const data = await getNotifications();
      setNotifications(data);
    };
    fetchData();
  }, []);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  // filter logic
  const filtered =
    activeTab === "all"
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  return (
    <div className="notif-dropdown" ref={dropdownRef}>
      {/* HEADER */}
      <div className="notif-header">
        <h4>Notifications</h4>
        <button className="close-btn" onClick={close}>
          ✖
        </button>
      </div>

      {/* TABS (UI SAME AS BEFORE) */}
      <div className="notif-tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>

        {isAdmin ? (
          <button
            className={activeTab === "claim" ? "active" : ""}
            onClick={() => setActiveTab("claim")}
          >
            Claim Requests
          </button>
        ) : (
          <>
            <button
              className={activeTab === "claim" ? "active" : ""}
              onClick={() => setActiveTab("claim")}
            >
              Claims
            </button>

            <button
              className={activeTab === "match" ? "active" : ""}
              onClick={() => setActiveTab("match")}
            >
              Matches
            </button>
          </>
        )}
      </div>

      {/* LIST */}
      <div className="notif-list">
        {filtered.length === 0 ? (
          <p className="empty">No notifications</p>
        ) : (
          filtered.map((n) => (
            <div key={n._id} className="notif-item">
              {/* DOT */}
              <div className={`dot ${n.type || "match"}`}></div>

              {/* TEXT (RESTORED UI) */}
              <div>
                <p className="title">{n.title}</p>
                <p className="message">{n.message}</p>
                <span className="time">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;