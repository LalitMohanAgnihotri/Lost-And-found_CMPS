import { useEffect, useState } from "react";
import { fetchLostItems } from "../../api/lost.api";
import { fetchFoundItems } from "../../api/found";

import LostCard from "../../components/LostCard";
import FoundCard from "../../components/FoundCard";
import CardSkeleton from "../../components/common/CardSkeleton";

const Home = () => {
  const [lost, setLost] = useState([]);
  const [found, setFound] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [lostData, foundData] = await Promise.all([
          fetchLostItems(),
          fetchFoundItems(),
        ]);

        setLost(lostData.slice(0, 3));

        const unresolvedFound = foundData.filter(
          (item) => item.isResolved === false
        );

        setFound(unresolvedFound.slice(0, 3));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="home-section text-center">
        <h6 className="home-heading">
          Lost and found — the place where all forgotten objects find their way
          back home
        </h6>

        <div className="home-content">
          <p className="home-description">
            It is a small but mighty office, a temporary sanctuary for misplaced
            belongings, from misplaced keys and forgotten umbrellas to lost
            wallets and cherished toys. This is where a shared sense of honesty
            and community shines, as strangers turn in what they've found,
            hoping to bring a small sense of relief to someone who's lost
            something dear. It's a place of quiet reunion and simple, everyday
            miracles.
          </p>
        </div>
      </section>

      <h5 className="mt-5">Recent Found Items</h5>

      <div className="card-grid">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))
        ) : found.length > 0 ? (
          found.map((item) => (
            <FoundCard key={item._id} item={item} />
          ))
        ) : (
          <p className="text-muted">No unresolved found items yet.</p>
        )}
      </div>

      <h5 className="mt-5">Recent Lost Items</h5>

      <div className="card-grid">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))
        ) : lost.length > 0 ? (
          lost.map((item) => (
            <LostCard key={item._id} item={item} />
          ))
        ) : (
          <p className="text-muted">No lost items yet.</p>
        )}
      </div>
    </>
  );
};

export default Home;