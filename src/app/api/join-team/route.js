import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { sanitize } from "sanitizer";

export async function POST(req, res) {
  try {
    const { email, name, reason, notes, phone, honeypot } = await req.json();

    if (honeypot) {
      console.log("Bot detected!");
      return NextResponse.json(
        {
          success: false,
          message: "Bot detected",
        },
        { status: 400 },
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address",
        },
        { status: 400 },
      );
    }

    // Validate phone (optional)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (phone && !phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid phone number",
        },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const sanitizedEmail = sanitize(email);
    const sanitizedName = sanitize(name);
    const sanitizedPhone = sanitize(phone);
    const sanitizedReason = sanitize(reason);
    const sanitizedNotes = sanitize(notes);

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
      to: "admin@windsorbhangraclub.com",
      subject: `Join Team Request: ${sanitizedReason}`,
      text: `Email: ${sanitizedEmail}\nName: ${sanitizedName}\nReason to Join: ${sanitizedReason}\nAdditional Notes: ${sanitizedNotes}\nPhone: ${sanitizedPhone}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`email sent: ${info.response}`);
    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (e) {
    console.error("Error: ", e);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send",
      },
      { status: 500 },
    );
  }
}
