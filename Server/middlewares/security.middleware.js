import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

export const securityMiddleware = (app) => {
  app.use(helmet());

  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin",
    })
  );

  app.use(mongoSanitize());

  app.use(hpp());
};