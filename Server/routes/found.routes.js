// routes/found.routes.js

import express from "express";
import {
  getAllFound,
  reportFound,
} from "../controllers/found.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { foundSchema } from "../validators/item.validator.js";

const router = express.Router();

router.get("/", getAllFound);

router.post(
  "/report",
  authMiddleware,
  upload.single("image"),
  validate(foundSchema),
  reportFound
);

export default router;