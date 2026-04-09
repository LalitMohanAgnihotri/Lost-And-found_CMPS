import express from "express";
import Notification from "../models/Notification.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

console.log("🔥 Notification route loaded");

// GET
router.get("/", auth, async (req, res) => {
  const data = await Notification.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(data);
});

// ✅ SAFE ROUTE (NO FAIL)
router.put("/read", auth, async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Notification.updateMany(
      { user: userId },
      { read: true }
    );

    res.json({ message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;