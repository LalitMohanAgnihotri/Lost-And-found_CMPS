import Claim from "../models/Claim.js";
import Found from "../models/Found.js";
import Notification from "../models/Notification.js";
import User from "../models/Users.js";
import { handleClaimDecision } from "../services/claim.service.js";

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
        message: "Already claimed",
      });
    }

    const claim = new Claim({
      user: req.user.id,
      itemId,
      proofMessage,
    });

    await claim.save();

    // 🔔 ADMIN NOTIFICATION
    const admins = await User.find({ role: "ADMIN" });

    for (const admin of admins) {
      await Notification.create({
        user: admin._id,
        title: "New Claim Request",
        message: "A user requested to claim an item",
        type: "claim",
      });
    }

    res.json({ message: "Claim submitted", claim });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// APPROVE
export const approveClaim = async (req, res) => {
  const claim = await Claim.findById(req.params.id);
  if (!claim) return res.status(404).json({ message: "Not found" });

  await handleClaimDecision(claim._id, "approved");

  await Found.findByIdAndUpdate(claim.itemId, {
    isResolved: true,
  });

  res.json({ message: "Approved" });
};

// REJECT
export const rejectClaim = async (req, res) => {
  const claim = await Claim.findById(req.params.id);
  if (!claim) return res.status(404).json({ message: "Not found" });

  await handleClaimDecision(claim._id, "rejected");

  res.json({ message: "Rejected" });
};