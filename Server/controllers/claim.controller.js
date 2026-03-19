import Claim from "../models/Claim.js";
import Found from "../models/Found.js";

// 🔥 GET ALL CLAIMS WITH ITEM DATA
export const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    // attach found item data
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

// 🔥 CREATE CLAIM
export const createClaim = async (req, res) => {
  try {
    const { itemId, proofMessage } = req.body;

    const existing = await Claim.findOne({
      user: req.user.id,
      itemId,
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

// 🔥 APPROVE
export const approveClaim = async (req, res) => {
  const claim = await Claim.findById(req.params.id);

  if (!claim) return res.status(404).json({ message: "Not found" });

  claim.status = "approved";
  await claim.save();

  // mark item resolved
  await Found.findByIdAndUpdate(claim.itemId, {
    isResolved: true,
  });

  res.json({ message: "Approved" });
};

// 🔥 REJECT
export const rejectClaim = async (req, res) => {
  await Claim.findByIdAndUpdate(req.params.id, {
    status: "rejected",
  });

  res.json({ message: "Rejected" });
};