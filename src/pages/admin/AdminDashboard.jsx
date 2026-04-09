import { useEffect, useState } from "react";
import api from "../../api/axios";
import LostCard from "../../components/LostCard";
import FoundCard from "../../components/FoundCard";
import AdminClaimCard from "../../components/AdminClaimCard";

import "../../styles/admindashboard.css";

const AdminDashboard = () => {
  const [data, setData] = useState({
    lost: [],
    found: [],
    claims: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [lostRes, foundRes, claimRes] = await Promise.all([
        api.get("/lost"),
        api.get("/found"),
        api.get("/claim"),
      ]);

      setData({
        lost: lostRes.data,
        found: foundRes.data,
        claims: claimRes.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ APPROVE
  const handleApprove = async (id) => {
    try {
      await api.put(`/claim/${id}/approve`);
      fetchData(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ REJECT
  const handleReject = async (id) => {
    try {
      await api.put(`/claim/${id}/reject`);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid mt-3 admin-dashboard">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">Overview of system activity</p>
      </div>

      {/* STATS */}
      <div className="stats-row mb-4">

        <div className="stat-item">
          <div className="stat-card">
            <h6>Total Lost</h6>
            <h3>{data.lost.length}</h3>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-card">
            <h6>Total Found</h6>
            <h3>{data.found.length}</h3>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-card">
            <h6>Total Claims</h6>
            <h3>{data.claims.length}</h3>
          </div>
        </div>

      </div>

      {/* 🔥 CLAIMS WITH MODAL */}
      <h5 className="section-title">Recent Claims</h5>
      <div className="grid-layout">
        {data.claims.slice(0, 3).map((claim) => (
          <AdminClaimCard
            key={claim._id}
            claim={claim}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </div>

      {/* LOST */}
      <h5 className="section-title">Recent Lost</h5>
      <div className="grid-layout">
        {data.lost.slice(0, 3).map((item) => (
          <LostCard
            key={item._id}
            item={{ ...item }}
            isAdmin={true}
          />
        ))}
      </div>

      {/* FOUND */}
      <h5 className="section-title">Recent Found</h5>
      <div className="grid-layout">
        {data.found.slice(0, 3).map((item) => (
          <FoundCard
            key={item._id}
            item={{ ...item }}
            isAdmin={true}
            showClaimButton={false}
          />
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;