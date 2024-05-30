import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { sanitize } from "sanitizer";

export async function POST(req, res) {
  try {
    const { name, email, phone, registerFor, age, sex, notes, honeypot } =
      await req.json();

    if (honeypot) {
      console.log("Bot detected!");
      return NextResponse.json(
        {
          success: false,
          message: "Bot detected",
        },
        { status: 400 }
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
        { status: 400 }
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
        { status: 400 }
      );
    }

    // Validate age
    const ageRegex = /^[0-9]+$/;
    if (!age || !ageRegex.test(age) || age <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid age",
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedEmail = sanitize(email);
    const sanitizedName = sanitize(name);
    const sanitizedPhone = sanitize(phone);
    const sanitizedRegisterFor = sanitize(registerFor);
    const sanitizedAge = sanitize(age);
    const sanitizedSex = sanitize(sex);
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
      to: "joban.d555@gmail.com",
      subject: `Registration Request: ${sanitizedRegisterFor}`,
      text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nPhone: ${sanitizedPhone}\nRegister For: ${sanitizedRegisterFor}\nAge: ${sanitizedAge}\nSex: ${sanitizedSex}\nAdditional Notes: ${sanitizedNotes}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`email sent: ${info.response}`);
    return NextResponse.json({
      success: true,
      message: "Registration successful!",
    });
  } catch (e) {
    console.error("Error: ", e);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to register",
      },
      { status: 500 }
    );
  }
}
