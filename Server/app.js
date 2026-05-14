import express from "express";
import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// security
import { securityMiddleware } from "./middlewares/security.middleware.js";
import {
  notFound,
  errorHandler,
} from "./middlewares/error.middleware.js";

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

app.set("trust proxy", 1);

// Allowed origins from env
const allowedOrigins = (
  process.env.CLIENT_URLS || ""
)
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // allow Postman / no-origin requests
      if (!origin) {
        return callback(null, true);
      }

      if (
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      return callback(
        new Error(
          "Not allowed by CORS"
        )
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
    ],
  })
);

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

securityMiddleware(app);

// Health route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/lost", lostRoutes);
app.use("/api/found", foundRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/claim", claimRoutes);
app.use("/api/user", userRoutes);
app.use(
  "/api/notifications",
  notificationRoutes
);

// Error handlers (LAST)
app.use(notFound);
app.use(errorHandler);

export default app;