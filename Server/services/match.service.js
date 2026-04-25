import Lost from "../models/Lost.js";
import Notification from "../models/Notification.js";
import { sendMail } from "../config/mail.config.js";
import { io } from "../server.js";

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
        const message = `We found a match for your lost item "${lost.item}"`;

        const existingNotification = await Notification.findOne({
          user: lost.reportedBy._id,
          message,
        });

        if (existingNotification) continue;

        const notif = await Notification.create({
          user: lost.reportedBy._id,
          title: "Match Found",
          message,
          type: "match",
        });

        // 🔔 Real-time socket emit
        io.to(lost.reportedBy._id.toString()).emit(
          "new_notification",
          notif
        );

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

        console.log("✅ Match notification + realtime alert + email sent");
      }
    }
  } catch (err) {
    console.error("❌ MATCH ERROR:", err.message);
  }
};