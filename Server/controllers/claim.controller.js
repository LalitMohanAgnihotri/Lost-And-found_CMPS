import Claim from "../models/Claim.js";
import Found from "../models/Found.js";
import { handleClaimDecision } from "../services/claim.service.js";

// GET ALL CLAIMS WITH ITEM DATA
export const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const updated = await Promise.all(
      claims.map(async (c) => {
        const item = await Found.findById(c.itemId);

        return {
          ...c.toObject(),
          item,
        };
      })
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE CLAIM
export const createClaim = async (req, res) => {
  try {
    const { itemId, proofMessage } = req.body;

    const existing = await Claim.findOne({
      user: req.user.id,
      itemId,
      status: { $in: ["pending", "approved"] },
    });

    if (existing) {
      return res.status(400).json({
        message: "You already claimed this item",
      });
    }

    const claim = new Claim({
      user: req.user.id,
      itemId,
      proofMessage,
    });

    await claim.save();

    res.status(201).json({
      message: "Claim submitted successfully",
      claim,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ APPROVE CLAIM (FIXED)
export const approveClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) return res.status(404).json({ message: "Not found" });

    // 🔥 PREVENT DUPLICATE APPROVAL
    if (claim.status === "approved") {
      return res.status(400).json({
        message: "Already approved",
      });
    }

    // 🔥 CALL SERVICE (handles email + notification)
    await handleClaimDecision(claim._id, "approved");

    // KEEP YOUR ORIGINAL LOGIC
    await Found.findByIdAndUpdate(claim.itemId, {
      isResolved: true,
    });

    res.json({ message: "Approved" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ REJECT CLAIM (FIXED)
export const rejectClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) return res.status(404).json({ message: "Not found" });

    // 🔥 PREVENT DUPLICATE REJECTION
    if (claim.status === "rejected") {
      return res.status(400).json({
        message: "Already rejected",
      });
    }

    // 🔥 CALL SERVICE (handles email + notification)
    await handleClaimDecision(claim._id, "rejected");

    res.json({ message: "Rejected" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};