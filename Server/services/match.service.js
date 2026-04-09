import Lost from "../models/Lost.js";
import Notification from "../models/Notification.js";
import { sendMail } from "../config/mail.config.js";

export const checkMatchAndNotify = async (foundItem) => {
  try {
    const lostItems = await Lost.find({
      isResolved: false,
    }).populate("reportedBy");

    for (const lost of lostItems) {
      const itemMatch =
        lost.item.toLowerCase().trim() ===
        foundItem.item.toLowerCase().trim();

      const locationMatch =
        lost.location.toLowerCase().trim() ===
        foundItem.location.toLowerCase().trim();

      if (itemMatch && locationMatch) {
        const existingNotification = await Notification.findOne({
          user: lost.reportedBy._id,
          message: `We found a match for your lost item "${lost.item}"`,
        });

        if (existingNotification) continue;

        await Notification.create({
          user: lost.reportedBy._id,
          title: "Match Found",
          message: `We found a match for your lost item "${lost.item}"`,
          type: "match",
        });

        await sendMail({
          to: lost.contactEmail,
          subject: "🔔 Match Found!",
          html: `
            <h3>Good News 🎉</h3>
            <p>We found a matching item for your lost report.</p>
            <p><b>Item:</b> ${lost.item}</p>
            <p><b>Location:</b> ${foundItem.location}</p>
          `,
        });

        console.log("✅ Match notification + email sent");
      }
    }
  } catch (err) {
    console.error("❌ MATCH ERROR:", err.message);
  }
};