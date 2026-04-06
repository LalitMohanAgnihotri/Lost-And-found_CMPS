import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import ProfileView from "../../components/ProfileView";

const UserProfile = () => {
  const { id } = useParams();

  const [data, setData] = useState({
    user: {},
    lost: [],
    found: [],
    claims: [],
  });

  const [activeTab, setActiveTab] = useState("lost");

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    const res = await api.get(`/admin/users/${id}`);
    setData(res.data);
  };

  return (
    <ProfileView
      data={data}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isAdmin={true}
    />
  );
};

export default UserProfile;