import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import useSocket from "../../hooks/useSocket";

import AdminClaimCard from "../../components/admin/AdminClaimCard";
import StatsCard from "../../components/admin/StatsCard";
import ClaimsChart from "../../components/admin/ClaimsChart";
import ClaimsPieChart from "../../components/admin/ClaimsPieChart";

import LostCard from "../../components/LostCard";
import FoundCard from "../../components/FoundCard";

import "../../styles/admindashboard.css";

const AdminDashboard = () => {
  const { user } = useAuth();
  const socket = useSocket(user?.id);

  const [data, setData] = useState({
    lost: [],
    found: [],
    claims: [],
  });

  const fetchData = async () => {
    try {
      const [lost, found, claims] = await Promise.all([
        api.get("/lost"),
        api.get("/found"),
        api.get("/claim"),
      ]);

      setData({
        lost: lost.data,
        found: found.data,
        claims: claims.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 Real-time updates
  useEffect(() => {
    if (!socket) return;

    const refreshDashboard = () => {
      fetchData();
    };

    socket.on("claim_created", refreshDashboard);
    socket.on("claim_updated", refreshDashboard);
    socket.on("new_notification", refreshDashboard);
    socket.on("item_created", refreshDashboard);
    socket.on("item_updated", refreshDashboard);

    return () => {
      socket.off("claim_created", refreshDashboard);
      socket.off("claim_updated", refreshDashboard);
      socket.off("new_notification", refreshDashboard);
      socket.off("item_created", refreshDashboard);
      socket.off("item_updated", refreshDashboard);
    };
  }, [socket]);

  const handleApprove = async (id) => {
    await api.put(`/claim/${id}/approve`);
    toast.success("Approved ✅");
  };

  const handleReject = async (id) => {
    await api.put(`/claim/${id}/reject`);
    toast.error("Rejected ❌");
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <p>Overview of system activity</p>
      </div>

      <div className="stats-row">
        <StatsCard title="Lost" value={data.lost.length} />
        <StatsCard title="Found" value={data.found.length} />
        <StatsCard title="Claims" value={data.claims.length} />
      </div>

      <div className="charts-row">
        <ClaimsChart claims={data.claims} />
        <ClaimsPieChart claims={data.claims} />
      </div>

      <h4 className="section-title">Recent Claims</h4>
      <div className="grid-layout">
        {data.claims.slice(0, 3).map((c) => (
          <AdminClaimCard
            key={c._id}
            claim={c}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </div>

      <h4 className="section-title">Recent Lost</h4>
      <div className="grid-layout">
        {data.lost.slice(0, 3).map((item) => (
          <LostCard key={item._id} item={item} isAdmin />
        ))}
      </div>

      <h4 className="section-title">Recent Found</h4>
      <div className="grid-layout">
        {data.found.slice(0, 3).map((item) => (
          <FoundCard
            key={item._id}
            item={item}
            isAdmin
            showClaimButton={false}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;