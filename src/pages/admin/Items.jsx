import { useEffect, useState } from "react";
import api from "../../api/axios";
import LostCard from "../../components/LostCard";
import FoundCard from "../../components/FoundCard";

const Items = () => {
  const [lost, setLost] = useState([]);
  const [found, setFound] = useState([]);
  const [activeTab, setActiveTab] = useState("lost");

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    status: "",
    date: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const [lostRes, foundRes] = await Promise.all([
        api.get("/admin/lost"),
        api.get("/admin/found"),
      ]);

      setLost(lostRes.data);
      setFound(foundRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filterItems = (items) => {
    return items.filter((item) => {
      const nameMatch = item.item
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      const locationMatch = item.location
        ?.toLowerCase()
        .includes(filters.location.toLowerCase());

      const statusMatch = filters.status
        ? filters.status === "resolved"
          ? item.isResolved
          : !item.isResolved
        : true;

      const dateMatch = filters.date
        ? new Date(item.createdAt).toDateString() ===
          new Date(filters.date).toDateString()
        : true;

      return nameMatch && locationMatch && statusMatch && dateMatch;
    });
  };

  return (
    <div className="container mt-4">

      <div className="mb-4">
        <h3 className="fw-bold">Manage Items</h3>
      </div>

      <div className="row g-2 mb-4">

        <div className="col-md-3">
          <input3
            type="text"
            name="search"
            placeholder="Search item..."
            className="form-control"
            value={filters.search}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <input
            type="text"
            name="location"
            placeholder="Location..."
            className="form-control"
            value={filters.location}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <select
            name="status"
            className="form-control"
            value={filters.status}
            onChange={handleChange}
          >
            <option value="">All Status</option>
            <option value="resolved">Resolved</option>
            <option value="unresolved">Unresolved</option>
          </select>
        </div>

        <div className="col-md-3">
          <input
            type="date"
            name="date"
            className="form-control"
            value={filters.date}
            onChange={handleChange}
          />
        </div>

      </div>

      <div className="mb-4 d-flex gap-3">
        <button
          className={`btn ${
            activeTab === "lost" ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => setActiveTab("lost")}
        >
          Lost Items
        </button>

        <button
          className={`btn ${
            activeTab === "found" ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => setActiveTab("found")}
        >
          Found Items
        </button>
      </div>

      <div className="row g-3">

        {activeTab === "lost" &&
          (filterItems(lost).length > 0 ? (
            filterItems(lost).map(item => (
              <div key={item._id} className="col-md-4">
                <LostCard item={{ ...item, title: item.item }} />
              </div>
            ))
          ) : (
            <p className="text-muted">No lost items found</p>
          ))}

        {activeTab === "found" &&
          (filterItems(found).length > 0 ? (
            filterItems(found).map(item => (
              <div key={item._id} className="col-md-4">
                <FoundCard
                  item={{ ...item, title: item.item }}
                  showClaimButton={false}
                />
              </div>
            ))
          ) : (
            <p className="text-muted">No found items found</p>
          ))}

      </div>
    </div>
  );
};

export default Items;