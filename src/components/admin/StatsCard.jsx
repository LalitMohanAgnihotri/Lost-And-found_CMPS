import { useEffect, useState } from "react";

const StatsCard = ({ title, value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="stat-card">
      <h6>{title}</h6>
      <h3>{count.toLocaleString()}</h3>
    </div>
  );
};

export default StatsCard;