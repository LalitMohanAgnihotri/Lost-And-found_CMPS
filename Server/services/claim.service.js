import Claim from "../models/Claim.js";
import Notification from "../models/Notification.js";
import { sendMail } from "../config/mail.config.js";

export const handleClaimDecision = async (claimId, status) => {
  try {
    const claim = await Claim.findById(claimId)
      .populate("user")
      .populate({
        path: "itemId",
        model: "Found",
      });

    if (!claim) throw new Error("Claim not found");

    // 🔥 PREVENT DUPLICATE EXECUTION
    if (claim.status === status) {
      console.log("⚠️ Already processed, skipping...");
      return;
    }

    // UPDATE STATUS
    claim.status = status;
    await claim.save();

    // 🔔 CREATE NOTIFICATION
    await Notification.create({
      user: claim.user._id,
      title: `Claim ${status}`,
      message: `Your claim has been ${status}`,
    });

    // 📧 SEND EMAIL
    await sendMail({
      to: claim.user.email,
      subject: `Claim ${status}`,
      html: `
        <h3>Your claim is ${status}</h3>
        <p>Item: ${claim.itemId?.item}</p>
      `,
    });

    console.log("✅ Claim notification + email sent");

  } catch (err) {
    console.error("❌ CLAIM SERVICE ERROR:", err.message);
  }
};