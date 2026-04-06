import { useEffect, useState } from "react";
import api from "../../api/axios";
import LostCard from "../../components/LostCard";
import FoundCard from "../../components/FoundCard";
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
      {/* CLAIMS */}
      <h1 className="section-title">Recent Claims</h1>
      <div className="grid-layout">
        {data.claims.slice(0, 3).map(claim => (
          <FoundCard
            key={claim._id}
            item={{ ...claim.item }}
            isAdmin={true}
            showClaimButton={false}
          />
        ))}
      </div>

      {/* LOST */}
      <h5 className="section-title">Recent Lost</h5>
      <div className="grid-layout">
        {data.lost.slice(0, 3).map(item => (
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
        {data.found.slice(0, 3).map(item => (
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