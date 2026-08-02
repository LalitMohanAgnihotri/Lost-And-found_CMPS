import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });

    if (error) {
      console.error(error);
      throw error;
    }

    console.log("✅ Email Sent");
    console.log(data);

    return data;
  } catch (err) {
    console.error("❌ Mail Error");
    console.error(err);
    throw err;
  }
};