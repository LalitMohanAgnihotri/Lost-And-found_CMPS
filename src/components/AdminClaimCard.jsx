import { useState } from "react";
import ClaimDetailsModal from "./ClaimDetailsModal";
import "../styles/claimCard.css";

const AdminClaimCard = ({ claim, onApprove, onReject }) => {
  const [show, setShow] = useState(false);

  const item = claim.item;
  if (!item) return null;

  return (
    <>
      <div className="claim-card-admin">

        {/* 🔥 STATUS BADGE ON TOP */}
        <span className={`status badge-top ${claim.status}`}>
          {claim.status}
        </span>

        <img src={item.image} alt={item.item} />

        <div className="claim-body">
          <h5 className="claim-title">{item.item}</h5>

          <p className="claim-location">{item.location}</p>

          <button
            className="details-btn"
            onClick={() => setShow(true)}
          >
            View Details
          </button>
        </div>
      </div>

      {show && (
        <ClaimDetailsModal
          claim={claim}
          onClose={() => setShow(false)}
          onApprove={onApprove}
          onReject={onReject}
        />
      )}
    </>
  );
};

export default AdminClaimCard;