import { Link } from "react-router-dom";
import "../styles/lost.css";

const FoundCard = ({ item, showClaimButton = true, claimStatus }) => {
  // 🔥 decide what to show
  const getStatus = () => {
    if (claimStatus) return claimStatus; // from profile claims
    return item.isResolved ? "resolved" : "unresolved";
  };

  const status = getStatus();

  const getClass = () => {
    if (status === "approved" || status === "resolved") return "status resolved";
    if (status === "rejected") return "status rejected";
    return "status unresolved";
  };

  return (
    <div className="lost-card">
      <img src={item.image} alt={item.item} className="lost-image" />

      <div className="lost-body">
        <h5 className="lost-title">{item.item}</h5>
        <p className="lost-desc">{item.description}</p>

        <p>
          <strong>Location:</strong> {item.location}
        </p>

        <p>
          <strong>Date Found:</strong>{" "}
          {new Date(item.dateFound).toLocaleDateString()}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span className={getClass()}>
            {status}
          </span>
        </p>

        {/* CLAIM BUTTON */}
        {showClaimButton && !item.isResolved && (
          <Link
            to={`/claim/found/${item._id}`}
            className="btn btn-primary mt-2 claim-btn"
          >
            Claim Item
          </Link>
        )}
      </div>
    </div>
  );
};

export default FoundCard;