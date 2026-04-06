import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProfileView from "../../components/ProfileView";

const Profile = () => {
  const [data, setData] = useState({
    user: {},
    lost: [],
    found: [],
    claims: [],
  });

  const [activeTab, setActiveTab] = useState("lost");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await api.get("/user/profile");
    setData(res.data);
  };

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