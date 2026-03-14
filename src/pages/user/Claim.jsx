import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import "../../styles/claim.css";

const Claim = () => {
  const { type, id } = useParams(); // lost | found
  const navigate = useNavigate();

  const [proofMessage, setProofMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post(
        "/claim",
        {
          itemType: type,
          itemId: id,
          proofMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert("Claim submitted successfully ✅");
      navigate(-1);
    } catch (err) {
      alert(err.response?.data?.message || "Claim failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="claim-container">
      <div className="claim-card">
        <h2>Claim {type === "lost" ? "Lost" : "Found"} Item</h2>

        <form className="claim-form" onSubmit={handleSubmit}>
          <label>Proof / Description</label>

          <textarea
            placeholder="Describe why this item belongs to you..."
            value={proofMessage}
            onChange={(e) => setProofMessage(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Claim"}
          </button>
        </form>

        <p className="claim-info">
          Please provide accurate information. False claims may be rejected.
        </p>
      </div>
    </div>
  );
};

export default Claim;
