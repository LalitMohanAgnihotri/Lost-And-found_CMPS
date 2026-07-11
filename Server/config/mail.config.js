import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

// Verify SMTP connection when server starts
transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Server Ready");
  }
});

export const sendMail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Lost & Found" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email Error:", error);
    return false;
  }
};