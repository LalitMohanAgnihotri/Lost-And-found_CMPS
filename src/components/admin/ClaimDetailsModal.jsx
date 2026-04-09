import { useEffect, useState } from "react";

const ClaimDetailsModal = ({ claim, onClose, onApprove, onReject }) => {
  const [loading, setLoading] = useState(null);
  const item = claim.item;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
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
      <div className="claim-modal" onClick={(e) => e.stopPropagation()}>
        {/* CLOSE */}
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {/* IMAGE */}
        <img src={item.image} alt={item.item} className="modal-image" />

        <div className="modal-body">
          <h3 className="modal-title">{item.item}</h3>
          <p className="modal-desc">{item.description}</p>

          {/* STATUS */}
          <span className={`status ${claim.status}`}>{claim.status}</span>

          <div className="modal-section">
            <h5>📍 Found Details</h5>
            <p>
              <b>Location:</b> {item.location}
            </p>
            <p>
              <b>Date:</b> {new Date(item.dateFound).toLocaleDateString()}
            </p>
          </div>

          <div className="modal-section">
            <h5>👤 Claimed By</h5>

            <p>
              <b>Name:</b> {claim.user?.name}
            </p>
            <p>
              <b>Email:</b> {claim.user?.email}
            </p>

            <p>
              <b>Claim Date:</b>{" "}
              {new Date(claim.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="modal-section">
            <h5>📝 Proof Message</h5>
            <div className="proof-box">{claim.proofMessage}</div>
          </div>

          {claim.status === "pending" && (
            <div className="modal-actions">
              <button className="approve" onClick={handleApprove}>
                {loading === "approve" ? (
                  <span className="spinner"></span>
                ) : (
                  "Approve"
                )}
              </button>

              <button className="reject" onClick={handleReject}>
                {loading === "reject" ? (
                  <span className="spinner"></span>
                ) : (
                  "Reject"
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
