import express from "express";
import { getAllLost } from "../controllers/lost.controller.js";

const router = express.Router();

router.get("/", getAllLost);

export default router;
