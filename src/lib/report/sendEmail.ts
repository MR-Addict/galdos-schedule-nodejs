import nodemailer from "nodemailer";

export interface EmailType {
  to: string;
  subject: string;
  text: string;
}

export default async function sendEmail(params: EmailType) {
  if (!process.env.EMAILFROM || !process.env.EMAILPASS) throw new Error("Please add email crential to env");

  const mailTransport = nodemailer.createTransport({
    host: "smtp.qq.email",
    service: "qq",
    secure: true,
    auth: {
      user: process.env.EMAILFROM,
      pass: process.env.EMAILPASS,
    },
  });

  try {
    await mailTransport.sendMail({ from: "MR-Addict@qq.com", ...params });
    return { status: true, message: "Sending email succeeded!" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Sending email failed!" };
  }
}
