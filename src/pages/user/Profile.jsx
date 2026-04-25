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

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProfile();
  }, []);

  // Live updates for claim changes / notifications
  useEffect(() => {
    if (!socket) return;

    const refreshData = () => {
      fetchProfile();
    };

    socket.on("claim_updated", refreshData);
    socket.on("new_notification", refreshData);

    return () => {
      socket.off("claim_updated", refreshData);
      socket.off("new_notification", refreshData);
    };
  }, [socket]);

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