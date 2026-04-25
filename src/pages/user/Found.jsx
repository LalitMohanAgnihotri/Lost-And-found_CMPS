import { useEffect, useState } from "react";
import { fetchFoundItems } from "../../api/found.js";
import FoundCard from "../../components/FoundCard.jsx";
import CardSkeleton from "../../components/common/CardSkeleton.jsx";
import "../../styles/lost.css";

const Found = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoundItems()
      .then(setFoundItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="lost-container">
      <h2 className="page-title">Found Items</h2>

      <div className="card-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))
          : foundItems.map((item) => (
              <FoundCard key={item._id} item={item} />
            ))}
      </div>
    </div>
  );
};

export default Found;