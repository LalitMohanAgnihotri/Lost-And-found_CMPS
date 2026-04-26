// backend/validators/claim.validator.js
import { z } from "zod";

export const createClaimSchema = z.object({
  itemId: z
    .string()
    .min(1, "Item ID is required"),

  proofMessage: z
    .string()
    .min(10, "Proof message must be at least 10 characters")
    .max(500, "Proof message too long"),
});