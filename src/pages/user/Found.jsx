import { useEffect, useState } from "react";
import { fetchFoundItems } from "../../api/found.js";
import FoundCard from "../../components/FoundCard.jsx";
import "../../styles/lost.css";

const Found = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoundItems()
      .then(setFoundItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="lost-container">
      <h2 className="page-title">Found Items</h2>

      <div className="card-grid">
        {foundItems.map((item) => (
          <FoundCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Found;
