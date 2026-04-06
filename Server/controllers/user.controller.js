import Lost from "../models/Lost.js";
import Found from "../models/Found.js";
import Claim from "../models/Claim.js";
import User from "../models/Users.js";
import mongoose from "mongoose";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // console.log("USER ID:", userId);

    // ✅ USER INFO
    const user = await User.findById(userId).select("-password");

    // ✅ MATCH YOUR SCHEMA
    const lost = await Lost.find({ reportedBy: userId })
      .sort({ createdAt: -1 });

    const found = await Found.find({ foundBy: userId })
      .sort({ createdAt: -1 });

    // ✅ CLAIMS (SAFE + MATCH YOUR STRUCTURE)
    const claimsRaw = await Claim.find({ user: userId })
      .sort({ createdAt: -1 });

    const claims = await Promise.all(
      claimsRaw.map(async (c) => {
        try {
          // 🔥 Validate ObjectId properly
          if (!mongoose.Types.ObjectId.isValid(c.itemId)) {
            return {
              ...c.toObject(),
              item: null,
            };
          }

          const item = await Found.findById(c.itemId);

          return {
            ...c.toObject(),
            item: item || null,
          };

        } catch (err) {
          console.log("CLAIM ERROR:", err.message);

          return {
            ...c.toObject(),
            item: null,
          };
        }
      })
    );

    res.json({
      user,
      lost,
      found,
      claims,
    });

  } catch (err) {
    console.error("PROFILE ERROR:", err);

    res.status(500).json({
      message: "Error fetching profile",
      error: err.message, // 🔥 important for debugging
    });
  }
};