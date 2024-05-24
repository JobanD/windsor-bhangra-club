import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    console.log("GOT HERE IN TRY BLOCK");
    const { email, subject, name, message } = await req.json();
    console.log(email, subject, name, message);
    // const body = await req.json(); // Correctly await the parsed JSON body
    // console.log("Received email data:", body);

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
      to: "joban.d555@gmail.com",
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`email sent: ${info.response}`);
    return NextResponse.json({
      success: true,
      message: "Email successfully sent!",
    });
  } catch (e) {
    console.error("Error: ", e);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send",
      },
      { status: 500 }
    );
  }
}
