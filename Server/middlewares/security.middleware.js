// middlewares/security.middleware.js

import helmet from "helmet";
import hpp from "hpp";

export const securityMiddleware = (app) => {
  // Core secure headers
  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: "cross-origin",
      },

      contentSecurityPolicy: false, // API server (can enable later if needed)

      frameguard: {
        action: "deny",
      },

      referrerPolicy: {
        policy: "no-referrer",
      },

      hidePoweredBy: true,
    })
  );

  // Prevent HTTP parameter pollution
  app.use(hpp());

  // Remove Express signature header
  app.disable("x-powered-by");
};