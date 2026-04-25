import { useEffect, useState } from "react";
import { fetchLostItems } from "../../api/lost.api.js";
import LostCard from "../../components/LostCard.jsx";
import CardSkeleton from "../../components/common/CardSkeleton.jsx";
import "../../styles/lost.css";

const Lost = () => {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLostItems()
      .then(setLostItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="lost-container">
      <h2 className="page-title">Lost Items</h2>

      <div className="card-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))
          : lostItems.map((item) => (
              <LostCard key={item._id} item={item} />
            ))}
      </div>
    </div>
  );
};

export default Lost;