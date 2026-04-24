import helmet from "helmet";
import hpp from "hpp";

export const securityMiddleware = (app) => {
  app.use(helmet());

  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin",
    })
  );

  app.use(hpp());
};