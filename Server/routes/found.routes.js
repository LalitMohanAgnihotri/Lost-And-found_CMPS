import express from "express";
import { getAllFound, reportFound } from "../controllers/found.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", getAllFound);

router.post(
  "/report",
  authMiddleware,
  upload.single("image"),
  reportFound
);

export default router;