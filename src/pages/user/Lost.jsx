import { useEffect, useState } from "react";
import { fetchLostItems } from "../../api/lost.api.js";
import LostCard from "../../components/LostCard.jsx";
import "../../styles/Lost.css";

const Lost = () => {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLostItems()
      .then(setLostItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="lost-container">
      <h2 className="page-title">Lost Items</h2>

      <div className="card-grid">
        {lostItems.map((item) => (
          <LostCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Lost;
