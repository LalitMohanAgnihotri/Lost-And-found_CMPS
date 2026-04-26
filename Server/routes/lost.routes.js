// routes/lost.routes.js

import express from "express";
import {
  getAllLost,
  reportLost,
} from "../controllers/lost.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { lostSchema } from "../validators/item.validator.js";

const router = express.Router();

router.get("/", getAllLost);

router.post(
  "/report",
  authMiddleware,
  upload.single("image"),
  validate(lostSchema),
  reportLost
);

export default router;