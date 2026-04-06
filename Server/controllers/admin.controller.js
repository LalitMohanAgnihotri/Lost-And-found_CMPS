import User from "../models/Users.js";
import Lost from "../models/Lost.js";
import Found from "../models/Found.js";
import Claim from "../models/Claim.js";

// ================= DASHBOARD =================
export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const lost = await Lost.countDocuments();
    const found = await Found.countDocuments();
    const claims = await Claim.countDocuments();

    res.json({ users, lost, found, claims });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= USERS =================
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 ADMIN VIEW USER PROFILE
export const getUserProfileAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");

    const lost = await Lost.find({ reportedBy: userId });
    const found = await Found.find({ foundBy: userId });

    const claims = await Claim.find({ user: userId });

    const claimsWithItems = await Promise.all(
      claims.map(async (c) => {
        const item = await Found.findById(c.itemId);
        return { ...c.toObject(), item };
      })
    );

    res.json({ user, lost, found, claims: claimsWithItems });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ITEMS =================
export const getLostItems = async (req, res) => {
  const items = await Lost.find()
    .populate("reportedBy", "name email");

  res.json(items);
};

export const getFoundItems = async (req, res) => {
  const items = await Found.find()
    .populate("foundBy", "name email");

  res.json(items);
};

// ================= DELETE =================
export const deleteLost = async (req, res) => {
  await Lost.findByIdAndDelete(req.params.id);
  res.json({ message: "Lost item deleted" });
};

export const deleteFound = async (req, res) => {
  await Found.findByIdAndDelete(req.params.id);
  res.json({ message: "Found item deleted" });
};