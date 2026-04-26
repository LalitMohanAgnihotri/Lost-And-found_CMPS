// routes/claim.routes.js

import express from "express";
import protect from "../middlewares/auth.middleware.js";

import {
  createClaim,
  getAllClaims,
  approveClaim,
  rejectClaim,
} from "../controllers/claim.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import { createClaimSchema } from "../validators/claim.validator.js";

const router = express.Router();

router.get("/", protect, getAllClaims);

router.post(
  "/",
  protect,
  validate(createClaimSchema),
  createClaim
);

router.put(
  "/:id/approve",
  protect,
  approveClaim
);

router.put(
  "/:id/reject",
  protect,
  rejectClaim
);

export default router;