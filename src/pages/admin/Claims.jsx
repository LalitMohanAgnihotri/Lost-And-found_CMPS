import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminClaimCard from "../../components/admin/AdminClaimCard";

const Claims = () => {
  const [claims, setClaims] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    date: "",
  });

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

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 FILTER LOGIC
  const filteredClaims = claims.filter((c) => {
    const searchMatch =
      c.item?.item?.toLowerCase().includes(filters.search.toLowerCase()) ||
      c.user?.name?.toLowerCase().includes(filters.search.toLowerCase());

    const statusMatch = filters.status
      ? c.status === filters.status
      : true;

    const dateMatch = filters.date
      ? new Date(c.createdAt).toDateString() ===
        new Date(filters.date).toDateString()
      : true;

    return searchMatch && statusMatch && dateMatch;
  });

  return (
    <div className="container mt-4">

      <h3 className="fw-bold mb-4">Claim Requests</h3>

      {/* 🔥 FILTER BAR (SAME AS ITEMS PAGE) */}
      <div className="row g-2 mb-4">

        <div className="col-md-4">
          <input
            type="text"
            name="search"
            placeholder="Search by item or user..."
            className="form-control"
            value={filters.search}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <select
            name="status"
            className="form-control"
            value={filters.status}
            onChange={handleChange}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="date"
            name="date"
            className="form-control"
            value={filters.date}
            onChange={handleChange}
          />
        </div>

      </div>

      {/* 🔥 CLAIM GRID */}
      <div className="claims-grid">
        {filteredClaims.length > 0 ? (
          filteredClaims.map((c) => (
            <AdminClaimCard
              key={c._id}
              claim={c}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        ) : (
          <p className="text-muted">No claims found</p>
        )}
      </div>

    </div>
  );
};

export default Claims;