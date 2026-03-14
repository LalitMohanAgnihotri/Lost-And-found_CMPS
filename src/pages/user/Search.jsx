import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import LostCard from "../../components/LostCard";
import FoundCard from "../../components/FoundCard";

import "../../styles/Lost.css";

const Search = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q");

  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.trim() === "") {
      setLostItems([]);
      setFoundItems([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);

      try {
        const lostRes = await fetch(
          `http://localhost:3000/api/lost?search=${query}`,
        );

        const foundRes = await fetch(
          `http://localhost:3000/api/found?search=${query}`,
        );

        const lostData = await lostRes.json();
        const foundData = await foundRes.json();

        setLostItems(lostData);
        setFoundItems(foundData);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchData();
  }, [query]);

  if (!query) {
    return (
      <div className="lost-container">
        <h2 className="page-title">Search</h2>
        <p className="text-center">Type something in the search bar</p>
      </div>
    );
  }

  if (loading) return <p className="text-center">Searching...</p>;

  return (
    <div className="lost-container">
      <h2 className="page-title">Search Results for "{query}"</h2>

      {lostItems.length === 0 && foundItems.length === 0 && (
        <p className="text-center">No items found</p>
      )}

      {lostItems.length > 0 && (
        <>
          <h3>Lost Items</h3>

          <div className="lost-grid">
            {lostItems.map((item) => (
              <LostCard key={item._id} item={item} />
            ))}
          </div>
        </>
      )}

      {foundItems.length > 0 && (
        <>
          <h3 className="mt-4">Found Items</h3>

          <div className="lost-grid">
            {foundItems.map((item) => (
              <FoundCard key={item._id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
