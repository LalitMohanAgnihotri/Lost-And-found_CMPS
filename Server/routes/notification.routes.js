import express from "express";
import Notification from "../models/Notification.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET USER NOTIFICATIONS
router.get("/", auth, async (req, res) => {
  const notifications = await Notification.find({
    user: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(notifications);
});

export default router;