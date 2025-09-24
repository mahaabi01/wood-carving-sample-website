//app/api/contact/route.ts  
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try{
    const { name, email, message } = await req.json();
    
    // configure transporter 
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OWNER_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Query from ${name}`,
      text: `You got a new message from ${name} (${email}): \n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully"});
    }catch(error){
      console.error("Error sending email:", error);
      return NextResponse.json({ success: false, message: "Failed to send email"}, {status: 500})
  }
}

