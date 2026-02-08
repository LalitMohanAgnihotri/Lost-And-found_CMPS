const LostCard = ({ item }) => {
  return (
    <div className="lost-card">
      <img src={item.image} alt={item.item} className="lost-image" />

      <div className="lost-body">
        <h5 className="lost-title">{item.item}</h5>
        <p className="lost-desc">{item.description}</p>

        <p><strong>Location:</strong> {item.location}</p>

        <p>
          <strong>Date Lost:</strong>{" "}
          {new Date(item.dateLost).toLocaleDateString()}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span className={item.isResolved ? "status resolved" : "status unresolved"}>
            {item.isResolved ? "Resolved" : "Unresolved"}
          </span>
        </p>

        
      </div>
    </div>
  );
};

export default LostCard;
