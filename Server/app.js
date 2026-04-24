import express from "express";
import cors from "cors";

// security
import { securityMiddleware } from "./middlewares/security.middleware.js";

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
import notificationRoutes from "./routes/notification.routes.js";

const app = express();

// trust proxy (important on Render / Railway / Vercel proxy)
app.set("trust proxy", 1);

// middlewares
app.use(cors());
app.use(express.json());

// security middlewares
securityMiddleware(app);

// health route
app.get("/", (req, res) => {
  res.json({ success: true, message: "API Running" });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/lost", lostRoutes);
app.use("/api/found", foundRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/claim", claimRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;