import { useState, useEffect, useRef } from "react";
import "../../styles/notification.css";

const NotificationDropdown = ({ close }) => {
  const [activeTab, setActiveTab] = useState("all");
  const dropdownRef = useRef(null);

  const notifications = [
    {
      id: 1,
      type: "claim",
      title: "New Claim Request",
      message: "Someone requested your lost wallet",
      time: "10 mins ago",
    },
    {
      id: 2,
      type: "match",
      title: "Item Match Found",
      message: "A found item matches your lost phone",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "status",
      title: "Item Resolved",
      message: "Your claim has been approved",
      time: "Yesterday",
    },
  ];

  const filtered =
    activeTab === "all"
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  // ✅ CLOSE WHEN CLICK OUTSIDE
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  return (
    <div className="notif-dropdown" ref={dropdownRef}>
      <div className="notif-header">
        <h4>Notifications</h4>
        <button className="close-btn" onClick={close}>
          ✖
        </button>
      </div>

      {/* Tabs */}
      <div className="notif-tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
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
      </div>

      {/* LIST */}
      <div className="notif-list">
        {filtered.length === 0 ? (
          <p className="empty">No notifications</p>
        ) : (
          filtered.map((n) => (
            <div key={n.id} className="notif-item">
              <div className={`dot ${n.type}`}></div>

              <div>
                <p className="title">{n.title}</p>
                <p className="message">{n.message}</p>
                <span className="time">{n.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;