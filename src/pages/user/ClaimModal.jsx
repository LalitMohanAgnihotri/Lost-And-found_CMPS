// import { useState } from "react";
// import api from "../../api/axios";
// import toast from "react-hot-toast";

// import "../../styles/claim.css";
// const ClaimModal = ({ item, type, onClose }) => {
//   const [proofMessage, setProofMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!proofMessage.trim()) return;

//     setLoading(true);

//     try {
//       await api.post(
//         "/claim",
//         {
//           itemType: type,
//           itemId: item._id,
//           proofMessage,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       toast.success("Claim submitted ✅");
//       onClose();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="user-claim-overlay" onClick={onClose}>
//   <div className="user-claim-modal" onClick={(e) => e.stopPropagation()}>

//     <button className="user-modal-close" onClick={onClose}>✕</button>

//     <h3 className="user-modal-title">Claim Item</h3>

//     <textarea
//       className="user-textarea"
//       placeholder="Describe why this item is yours..."
//       value={proofMessage}
//       onChange={(e) => setProofMessage(e.target.value)}
//     />

//     <div className="user-modal-actions">
//       <button onClick={handleSubmit} disabled={loading}>
//         {loading ? "Submitting..." : "Submit Claim"}
//       </button>
//     </div>

//   </div>
// </div>
//   );
// };

// export default ClaimModal;