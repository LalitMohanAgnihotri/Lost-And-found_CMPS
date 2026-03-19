import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminClaimCard from "../../components/AdminClaimCard";

const Claims = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    const res = await api.get("/claim", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setClaims(res.data);
  };

  const handleApprove = async (id) => {
    await api.put(`/claim/${id}/approve`);
    fetchClaims();
  };

  const handleReject = async (id) => {
    await api.put(`/claim/${id}/reject`);
    fetchClaims();
  };

  return (
    <div>
      <h2>Claim Requests 📩</h2>

      <div className="claims-grid">
        {claims.map((c) => (
          <AdminClaimCard
            key={c._id}
            claim={c}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
      </div>
    </div>
  );
};

export default Claims;