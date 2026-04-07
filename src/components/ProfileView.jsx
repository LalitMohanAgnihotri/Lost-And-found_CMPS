import LostCard from "./LostCard";
import FoundCard from "./FoundCard";
import "../styles/profile.css";

const ProfileView = ({ data, activeTab, setActiveTab, isAdmin = false }) => {
  const getStatusColor = (status) => {
    if (status === "approved") return "bg-success";
    if (status === "rejected") return "bg-danger";
    return "bg-warning text-dark";
  };

  return (
    <div className="container mt-4">
      {/* HEADER */}
      <div className="card p-4 shadow-sm mb-4">
        <h3 className="fw-bold mb-1">{data.user?.name}</h3>
        <p className="text-muted mb-3">{data.user?.email}</p>

        {/* STATS */}
        <div className="d-flex gap-4">
          <div>
            <small className="text-muted">Lost</small>
            <h5>{data.lost.length}</h5>
          </div>
          <div>
            <small className="text-muted">Found</small>
            <h5>{data.found.length}</h5>
          </div>
          <div>
            <small className="text-muted">Claims</small>
            <h5>{data.claims.length}</h5>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mb-4 d-flex gap-3 flex-wrap">
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

        <button
          className={`btn ${
            activeTab === "claims" ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => setActiveTab("claims")}
        >
          Claims
        </button>
      </div>

      {/* CONTENT */}
      <div className="row g-3">
        {/* LOST */}
        {activeTab === "lost" &&
          (data.lost.length > 0 ? (
            data.lost.map((item) => (
              <div key={item._id} className="col-md-4">
                <LostCard item={{ ...item, title: item.item }} />
              </div>
            ))
          ) : (
            <p className="text-muted">No lost items</p>
          ))}

        {/* FOUND */}
        {activeTab === "found" &&
          (data.found.length > 0 ? (
            data.found.map((item) => (
              <div key={item._id} className="col-md-4">
                <FoundCard
                  item={{ ...item, title: item.item }}
                  showClaimButton={!isAdmin}
                />
              </div>
            ))
          ) : (
            <p className="text-muted">No found items</p>
          ))}
        {/* CLAIMS */}
        {/* CLAIMS */}
{activeTab === "claims" &&
  (data.claims.length > 0 ? (
    data.claims.map((claim) => (
      <div key={claim._id} className="col-md-4">

        {claim.item && (
          <FoundCard
            item={{ ...claim.item, title: claim.item.item }}
            showClaimButton={false}
            claimStatus={claim.status} // ✅ PASS STATUS HERE
          />
        )}

      </div>
    ))
  ) : (
    <p className="text-muted">No claims yet</p>
  ))}
      </div>
    </div>
  );
};

export default ProfileView;
