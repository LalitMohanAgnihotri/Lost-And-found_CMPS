import { Link } from "react-router-dom";
import "../styles/lost.css";

const FoundCard = ({ item }) => {
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
          <span
            className={
              item.isResolved ? "status resolved" : "status unresolved"
            }
          >
            {item.isResolved ? "Resolved" : "Unresolved"}
          </span>
        </p>

        {!item.isResolved && (
          <Link
            to={`/claim/found/${item._id}`}   // ✅ FIXED
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
