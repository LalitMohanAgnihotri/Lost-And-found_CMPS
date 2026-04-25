const CardSkeleton = () => {
  return (
    <div className="card shadow-sm border-0 p-3">
      <div
        className="placeholder-glow mb-3"
        style={{ height: "180px" }}
      >
        <span className="placeholder col-12 h-100 rounded"></span>
      </div>

      <p className="placeholder-glow mb-2">
        <span className="placeholder col-8"></span>
      </p>

      <p className="placeholder-glow mb-2">
        <span className="placeholder col-6"></span>
      </p>

      <p className="placeholder-glow">
        <span className="placeholder col-4"></span>
      </p>
    </div>
  );
};

export default CardSkeleton;