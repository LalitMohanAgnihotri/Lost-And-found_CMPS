import Claim from "../models/Claim.js";
import Notification from "../models/Notification.js";
import { sendMail } from "../config/mail.config.js";

export const handleClaimDecision = async (claimId, status) => {
  try {
    const claim = await Claim.findById(claimId)
      .populate("user")
      .populate({ path: "itemId", model: "Found" });

    if (!claim) return;

    if (claim.status === status) return;

    claim.status = status;
    await claim.save();

    // ✅ USER NOTIFICATION
    await Notification.create({
      user: claim.user._id,
      title: `Claim ${status}`,
      message: `Your claim has been ${status}`,
      type: "claim", // 🔥 FIX
    });

    await sendMail({
      to: claim.user.email,
      subject: `Claim ${status}`,
      html: `<h3>Your claim is ${status}</h3>`,
    });

  } catch (err) {
    console.error(err.message);
  }
};