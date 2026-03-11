import express from "express";
import { getAllLost, reportLost } from "../controllers/lost.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", getAllLost);

router.post(
  "/report",
  authMiddleware,
  upload.single("image"),
  reportLost
);

export default router;