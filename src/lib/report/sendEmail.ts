import nodemailer from "nodemailer";

export interface EmailType {
  to: string;
  subject: string;
  text: string;
}

export default async function sendEmail(params: EmailType) {
  if (!process.env.EMAILPASS) throw new Error("Please add email crential to env");

  const emailFrom = "MR-Addict@qq.com";
  const mailTransport = nodemailer.createTransport({
    host: "smtp.qq.email",
    service: "qq",
    secure: true,
    auth: {
      user: emailFrom,
      pass: process.env.EMAILPASS
    }
  });

  try {
    await mailTransport.sendMail({ from: emailFrom, ...params });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
