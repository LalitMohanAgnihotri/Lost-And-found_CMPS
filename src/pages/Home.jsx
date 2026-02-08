import { useEffect, useState } from "react";
import { fetchLostItems } from "../api/lost.api";
import { fetchFoundItems } from "../api/found";
import LostCard from "../components/LostCard";
import FoundCard from "../components/FoundCard";

const Home = () => {
  const [lost, setLost] = useState([]);
  const [found, setFound] = useState([]);

  useEffect(() => {
    // Lost items (no filter needed)
    fetchLostItems().then((data) =>
      setLost(data.slice(0, 3))
    );

    // Found items → ONLY unresolved
    fetchFoundItems().then((data) => {
      const unresolvedFound = data.filter(
        (item) => item.isResolved === false
      );
      setFound(unresolvedFound.slice(0, 3));
    });
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="home-section text-center">
        <h6 className="home-heading">
          Lost and found — the place where all forgotten objects find their way back home
        </h6>

        <div className="home-content">
          <p className="home-description">
            It is a small but mighty office, a temporary sanctuary for misplaced
            belongings, from misplaced keys and forgotten umbrellas to lost
            wallets and cherished toys. This is where a shared sense of honesty
            and community shines.
          </p>
        </div>
      </section>

      {/* CARDS AREA */}
      <div className="home-cards">
        <h5 className="mt-4">Recent Lost Items</h5>
        <div className="lost-grid">
          {lost.map((item) => (
            <LostCard key={item._id} item={item} />
          ))}
        </div>

        <h5 className="mt-5">Recent Found Items</h5>
        <div className="lost-grid">
          {found.length > 0 ? (
            found.map((item) => (
              <FoundCard key={item._id} item={item} />
            ))
          ) : (
            <p className="text-muted">No unresolved found items yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
