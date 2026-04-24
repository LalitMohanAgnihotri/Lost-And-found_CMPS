import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

export const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(1, "Password required"),
});

export const sendOtpSchema = z.object({
  email: z.string().email("Valid email required"),
});

export const verifyOtpSchema = z.object({
  email: z.string().email("Valid email required"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});