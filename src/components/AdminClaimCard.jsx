import "../styles/lost.css";
import "../styles/claimCard.css";
const AdminClaimCard = ({ claim, onApprove, onReject }) => {
  const item = claim.item;

  if (!item) return null;

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

        {/* USER INFO */}
        <p>
          <strong>User:</strong> {claim.user?.name}
        </p>

        <p>
          <strong>Email:</strong> {claim.user?.email}
        </p>

        {/* CLAIM MESSAGE */}
        <p>
          <strong>Proof:</strong> {claim.proofMessage}
        </p>

        {/* STATUS */}
        <p>
          <strong>Status:</strong>{" "}
          <span className={`status ${claim.status}`}>
            {claim.status}
          </span>
        </p>

        {/* ACTIONS */}
        {claim.status === "pending" && (
          <div className="mt-2">
            <button
              className="btn btn-success me-2"
              onClick={() => onApprove(claim._id)}
            >
              Approve
            </button>

            <button
              className="btn btn-danger"
              onClick={() => onReject(claim._id)}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClaimCard;