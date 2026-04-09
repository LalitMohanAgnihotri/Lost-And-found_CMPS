import { useState } from "react";
import ClaimDetailsModal from "./ClaimDetailsModal";
import "../../styles/claimCard.css";

const AdminClaimCard = ({ claim, onApprove, onReject }) => {
  const [show, setShow] = useState(false);
  const item = claim.item;

  if (!item) return null;

  return (
    <>
      <div className="claim-card-admin">

        {/* STATUS BADGE */}
        <span className={`status badge-top ${claim.status}`}>
          {claim.status}
        </span>

        <img src={item.image} alt="" />

        <div className="claim-body">
          <h5>{item.item}</h5>

          <p className="claim-location">{item.location}</p>

          {/* 🔥 NEW INFO */}
          <p className="claim-user">👤 {claim.user?.name}</p>

          <p className="claim-date">
            📅 {new Date(claim.createdAt).toLocaleDateString()}
          </p>

          <button onClick={() => setShow(true)} className="details-btn">
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