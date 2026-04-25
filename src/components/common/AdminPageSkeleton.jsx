const AdminPageSkeleton = ({
  cards = 3,
  table = false,
}) => {
  return (
    <div className="container mt-4">
      <div className="placeholder-glow mb-4">
        <span className="placeholder col-3"></span>
      </div>

      {table ? (
        <div className="card p-3 shadow-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="placeholder-glow mb-3"
            >
              <span className="placeholder col-12"></span>
            </div>
          ))}
        </div>
      ) : (
        <div className="row g-3">
          {Array.from({ length: cards }).map(
            (_, i) => (
              <div
                key={i}
                className="col-md-4"
              >
                <div className="card p-3 shadow-sm">
                  <div
                    className="placeholder-glow mb-3"
                    style={{
                      height: "180px",
                    }}
                  >
                    <span className="placeholder col-12 h-100 rounded"></span>
                  </div>

                  <p className="placeholder-glow mb-2">
                    <span className="placeholder col-8"></span>
                  </p>

                  <p className="placeholder-glow">
                    <span className="placeholder col-5"></span>
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPageSkeleton;