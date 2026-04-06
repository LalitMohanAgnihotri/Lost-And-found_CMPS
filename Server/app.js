import express from "express";
import cors from "cors";

// register models
import "./models/Users.js";
import "./models/Lost.js";
import "./models/Found.js";
import "./models/Claim.js";


// routes
import authRoutes from "./routes/auth.routes.js";
import lostRoutes from "./routes/lost.routes.js";
import foundRoutes from "./routes/found.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import claimRoutes from "./routes/claim.routes.js";
import userRoutes from "./routes/user.routes.js";



const app = express(); // ✅ app FIRST

// middlewares
app.use(cors());
app.use(express.json());
// routes
app.use("/api/auth", authRoutes);
app.use("/api/lost", lostRoutes);
app.use("/api/found", foundRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/claim", claimRoutes);
app.use("/api/user", userRoutes);


export default app;
