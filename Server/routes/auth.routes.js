import express from "express";
import {
  signup,
  login,
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../controllers/auth.controller.js";

import { validate } from "../middlewares/validate.middleware.js";
import {
  signupSchema,
  loginSchema,
  sendOtpSchema,
  verifyOtpSchema,
  resetPasswordSchema,
} from "../validators/auth.validator.js";

import {
  authLimiter,
  forgotPasswordLimiter,
} from "../middlewares/rateLimit.middleware.js";

const router = express.Router();

router.post("/signup", authLimiter, validate(signupSchema), signup);
router.post("/login", authLimiter, validate(loginSchema), login);

router.post(
  "/send-otp",
  forgotPasswordLimiter,
  validate(sendOtpSchema),
  sendOtp
);

router.post(
  "/verify-otp",
  validate(verifyOtpSchema),
  verifyOtp
);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPassword
);

export default router;