import express from "express";
import protect from "../middlewares/auth.middleware.js";
import {
  createClaim,
  getAllClaims,
  approveClaim,
  rejectClaim,
} from "../controllers/claim.controller.js";

const router = express.Router();

router.get("/", protect, getAllClaims);
router.post("/", protect, createClaim);

router.put("/:id/approve", protect, approveClaim);
router.put("/:id/reject", protect, rejectClaim);

export default router;