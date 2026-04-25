import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import useSocket from "../../hooks/useSocket";

import AdminClaimCard from "../../components/admin/AdminClaimCard";
import AdminPageSkeleton from "../../components/common/AdminPageSkeleton";

const Claims = () => {
  const { user } = useAuth();
  const socket = useSocket(user?.id);

  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    date: "",
  });

  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const fetchClaims = async () => {
    try {
      const res = await api.get("/claim");
      setClaims(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load claims");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const refreshClaims = () => {
      fetchClaims();
    };

    socket.on("claim_created", refreshClaims);
    socket.on("claim_updated", refreshClaims);
    socket.on("new_notification", refreshClaims);

    return () => {
      socket.off("claim_created", refreshClaims);
      socket.off("claim_updated", refreshClaims);
      socket.off("new_notification", refreshClaims);
    };
  }, [socket]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(
        filters.search.toLowerCase().trim()
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [filters.search]);

  const handleApprove = async (id) => {
    try {
      await api.put(`/claim/${id}/approve`);
      toast.success("Approved ✅");
    } catch (err) {
      toast.error("Failed to approve");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/claim/${id}/reject`);
      toast.error("Rejected ❌");
    } catch (err) {
      toast.error("Failed to reject");
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredClaims = claims.filter((c) => {
    const searchMatch =
      c.item?.item
        ?.toLowerCase()
        .includes(debouncedSearch) ||
      c.user?.name
        ?.toLowerCase()
        .includes(debouncedSearch);

    const statusMatch = filters.status
      ? c.status === filters.status
      : true;

    const dateMatch = filters.date
      ? new Date(c.createdAt).toDateString() ===
        new Date(filters.date).toDateString()
      : true;

    return searchMatch && statusMatch && dateMatch;
  });

  if (loading) {
    return <AdminPageSkeleton cards={6} />;
  }

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-4">
        Claim Requests
      </h3>

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
            <option value="">
              All Status
            </option>
            <option value="pending">
              Pending
            </option>
            <option value="approved">
              Approved
            </option>
            <option value="rejected">
              Rejected
            </option>
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
          <p className="text-muted">
            No claims found
          </p>
        )}
      </div>
    </div>
  );
};

export default Claims;