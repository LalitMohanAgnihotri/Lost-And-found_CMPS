import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProfileView from "../../components/ProfileView";
import { useAuth } from "../../context/AuthContext";
import useSocket from "../../hooks/useSocket";

const Profile = () => {
  const { user } = useAuth();
  const socket = useSocket(user?.id);

  const [data, setData] = useState({
    user: {},
    lost: [],
    found: [],
    claims: [],
  });

  const [activeTab, setActiveTab] = useState("lost");
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProfile();
  }, []);

  // Live updates
  useEffect(() => {
    if (!socket) return;

    const refreshData = () => {
      fetchProfile();
    };

    socket.on("claim_updated", refreshData);
    socket.on("new_notification", refreshData);
    socket.on("item_created", refreshData);
    socket.on("item_updated", refreshData);

    return () => {
      socket.off("claim_updated", refreshData);
      socket.off("new_notification", refreshData);
      socket.off("item_created", refreshData);
      socket.off("item_updated", refreshData);
    };
  }, [socket]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="card p-4 shadow-sm mb-4">
          <div className="placeholder-glow mb-3">
            <span className="placeholder col-4"></span>
          </div>

          <div className="placeholder-glow mb-2">
            <span className="placeholder col-6"></span>
          </div>

          <div className="placeholder-glow">
            <span className="placeholder col-3"></span>
          </div>
        </div>

        <div className="row g-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="col-md-4">
              <div className="card p-3 shadow-sm">
                <div
                  className="placeholder-glow mb-3"
                  style={{ height: "180px" }}
                >
                  <span className="placeholder col-12 h-100 rounded"></span>
                </div>

                <p className="placeholder-glow mb-2">
                  <span className="placeholder col-8"></span>
                </p>

                <p className="placeholder-glow">
                  <span className="placeholder col-5"></span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ProfileView
      data={data}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isAdmin={false}
    />
  );
};

export default Profile;