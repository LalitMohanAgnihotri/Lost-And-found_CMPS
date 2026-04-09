import { useState, useEffect } from "react";

const ClaimDetailsModal = ({ claim, onClose, onApprove, onReject }) => {
  const [loading, setLoading] = useState(null);
  const item = claim.item;

  // 🔥 LOCK BACKGROUND SCROLL
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleApprove = async () => {
    if (!window.confirm("Approve this claim?")) return;

    setLoading("approve");
    await onApprove(claim._id);
    setLoading(null);
    onClose();
  };

  const handleReject = async () => {
    if (!window.confirm("Reject this claim?")) return;

    setLoading("reject");
    await onReject(claim._id);
    setLoading(null);
    onClose();
  };

  return (
    <div className="claim-modal-overlay" onClick={onClose}>
      <div
        className="claim-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* IMAGE */}
        <img src={item.image} alt={item.item} className="modal-image" />

        <div className="modal-body">
          <h3>{item.item}</h3>
          <p className="modal-desc">{item.description}</p>

          <hr />

          {/* FOUND DETAILS */}
          <h5>📍 Found Details</h5>
          <p><strong>Location:</strong> {item.location}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(item.dateFound).toLocaleDateString()}
          </p>

          <hr />

          {/* USER */}
          <h5>👤 Claimed By</h5>
          <p><strong>Name:</strong> {claim.user?.name}</p>
          <p><strong>Email:</strong> {claim.user?.email}</p>

          <hr />

          {/* PROOF */}
          <h5>📝 Proof Message</h5>
          <p className="proof-box">{claim.proofMessage}</p>

          {/* STATUS */}
          <p className="mt-2">
            Status:{" "}
            <span className={`status ${claim.status}`}>
              {claim.status}
            </span>
          </p>

          {/* ACTIONS */}
          {claim.status === "pending" && (
            <div className="modal-actions">
              <button className="approve" onClick={handleApprove}>
                {loading === "approve" ? (
                  <span className="spinner"></span>
                ) : (
                  "✔ Approve"
                )}
              </button>

              <button className="reject" onClick={handleReject}>
                {loading === "reject" ? (
                  <span className="spinner"></span>
                ) : (
                  "✖ Reject"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimDetailsModal;