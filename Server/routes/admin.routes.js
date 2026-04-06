import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/role.middleware.js";

import {
  getStats,
  getUsers,
  getUserProfileAdmin,
  getLostItems,
  getFoundItems,
  deleteLost,
  deleteFound
} from "../controllers/admin.controller.js";

const router = express.Router();

// DASHBOARD
router.get("/stats", authMiddleware, isAdmin, getStats);

// USERS
router.get("/users", authMiddleware, isAdmin, getUsers);
router.get("/users/:id", authMiddleware, isAdmin, getUserProfileAdmin);

// ITEMS
router.get("/lost", authMiddleware, isAdmin, getLostItems);
router.get("/found", authMiddleware, isAdmin, getFoundItems);

// DELETE
router.delete("/lost/:id", authMiddleware, isAdmin, deleteLost);
router.delete("/found/:id", authMiddleware, isAdmin, deleteFound);

export default router;