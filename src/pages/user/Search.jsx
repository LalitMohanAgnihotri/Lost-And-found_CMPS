import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import api from "../../api/axios";

import LostCard from "../../components/LostCard";
import FoundCard from "../../components/FoundCard";
import CardSkeleton from "../../components/common/CardSkeleton";

import "../../styles/lost.css";

const Search = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";

  const [searchTerm, setSearchTerm] =
    useState(query);

  const [debouncedSearch, setDebouncedSearch] =
    useState(query);

  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sync URL query to state
  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(
        searchTerm.trim()
      );
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!debouncedSearch) {
      setLostItems([]);
      setFoundItems([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);

      try {
        const [lostRes, foundRes] =
          await Promise.all([
            api.get(
              `/lost?search=${encodeURIComponent(
                debouncedSearch
              )}`
            ),
            api.get(
              `/found?search=${encodeURIComponent(
                debouncedSearch
              )}`
            ),
          ]);

        setLostItems(
          lostRes.data.data ||
            lostRes.data
        );

        setFoundItems(
          foundRes.data.data ||
            foundRes.data
        );

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch]);

  if (!query.trim()) {
    return (
      <div className="lost-container">
        <h2 className="page-title">
          Search
        </h2>

        <p className="text-center">
          Type something in the search bar
        </p>
      </div>
    );
  }

  return (
    <div className="lost-container">
      <h2 className="page-title">
        Search Results for "{query}"
      </h2>

      {loading ? (
        <div className="card-grid">
          {Array.from({
            length: 6,
          }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {lostItems.length === 0 &&
            foundItems.length === 0 && (
              <p className="text-center">
                No items found
              </p>
            )}

          {lostItems.length > 0 && (
            <>
              <h3>Lost Items</h3>

              <div className="card-grid">
                {lostItems.map(
                  (item) => (
                    <LostCard
                      key={
                        item._id ||
                        item.id
                      }
                      item={item}
                    />
                  )
                )}
              </div>
            </>
          )}

          {foundItems.length > 0 && (
            <>
              <h3 className="mt-4">
                Found Items
              </h3>

              <div className="card-grid">
                {foundItems.map(
                  (item) => (
                    <FoundCard
                      key={
                        item._id ||
                        item.id
                      }
                      item={item}
                    />
                  )
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Search;