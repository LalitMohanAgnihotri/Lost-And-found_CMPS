import express from "express";
import cors from "cors";

// register models
import "./models/Users.js";
import "./models/Lost.js";
import "./models/Found.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import lostRoutes from "./routes/lost.routes.js";
import foundRoutes from "./routes/found.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express(); // ✅ app FIRST

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/lost", lostRoutes);
app.use("/api/found", foundRoutes);
app.use("/api/admin", adminRoutes);

export default app;
