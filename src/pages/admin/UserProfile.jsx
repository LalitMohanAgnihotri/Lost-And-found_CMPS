import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

import ProfileView from "../../components/ProfileView";
import AdminPageSkeleton from "../../components/common/AdminPageSkeleton";

const UserProfile = () => {
  const { id } = useParams();

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
      const res = await api.get(
        `/admin/users/${id}`
      );

      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (loading) {
    return <AdminPageSkeleton cards={3} />;
  }

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