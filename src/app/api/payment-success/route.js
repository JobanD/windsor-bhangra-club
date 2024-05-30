import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { amount, name, email } = await request.json();

    // Send an email with the payment details
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: [email, "joban.d555@gmail.com"],
      subject: "Payment Confirmation",
      text: `Thank you for your payment of $${(amount / 100).toFixed(2)}. 
      Name: ${name}
      Email: ${email}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    return NextResponse.json({
      success: true,
      message: "Payment confirmation email sent successfully!",
    });
  } catch (e) {
    console.error("Error: ", e);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send confirmation email",
      },
      { status: 500 }
    );
  }
}
