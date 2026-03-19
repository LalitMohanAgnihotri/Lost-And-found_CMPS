import User from "../models/Users.js";
import Lost from "../models/Lost.js";
import Found from "../models/Found.js";

// GET DASHBOARD STATS
export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const lost = await Lost.countDocuments();
    const found = await Found.countDocuments();

    res.json({
      users,
      lost,
      found,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL USERS
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// GET LOST ITEMS
export const getLostItems = async (req, res) => {
  const items = await Lost.find().populate("user", "name email");
  res.json(items);
};

// GET FOUND ITEMS
export const getFoundItems = async (req, res) => {
  const items = await Found.find().populate("user", "name email");
  res.json(items);
};

// DELETE ITEM
export const deleteLost = async (req, res) => {
  await Lost.findByIdAndDelete(req.params.id);
  res.json({ message: "Lost item deleted" });
};

export const deleteFound = async (req, res) => {
  await Found.findByIdAndDelete(req.params.id);
  res.json({ message: "Found item deleted" });
};