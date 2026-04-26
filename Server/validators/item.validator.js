// backend/validators/item.validator.js

import { z } from "zod";

export const lostSchema = z.object({
  item: z
    .string()
    .min(2, "Item name is required")
    .max(100, "Item name too long"),

  description: z
    .string()
    .max(500, "Description too long")
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .min(2, "Location is required")
    .max(120, "Location too long"),

  contactEmail: z
    .string()
    .email("Valid contact email required"),
});

export const foundSchema = z.object({
  item: z
    .string()
    .min(2, "Item name is required")
    .max(100, "Item name too long"),

  description: z
    .string()
    .max(500, "Description too long")
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .min(2, "Location is required")
    .max(120, "Location too long"),
});