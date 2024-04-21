import nodemailer from "nodemailer";

const email = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: email,
    pass: password,
  },
});

export default async function sendEmail(prevState, formData) {
  try {
    const mailOptions = {
      from: formData.get("email"),
      to: "joban.d555@gmail.com",
      subject: `New contact email: ${formData.get(
        "subject"
      )}, Email: ${formData.get("email")}`,
      text: formData.get("message"),
    };
    const info = await transporter.sendMail(mailOptions);
    return { message: "Success!" };
  } catch (e) {
    console.error(e);
    return { message: "Error" };
  }
}
