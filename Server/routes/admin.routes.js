import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/role.middleware.js";

const router = express.Router();

// Admin dashboard
router.get("/dashboard", authMiddleware, isAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});
router.get("/dashboard", authMiddleware, isAdmin, (req, res) => {
  console.log("User:", req.user);

  res.json({
    message: "Welcome Admin",
  });
});
export default router;