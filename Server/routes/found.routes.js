import express from "express";
import { getAllFound } from "../controllers/found.controller.js";

const router = express.Router();

router.get("/", getAllFound);

export default router;
