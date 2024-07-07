import nodemailer from 'nodemailer';
import { ResponseError } from '../error/response-error';

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: 'devicetesting318@gmail.com',
    pass: 'rojk lyan poog xyof'
  }
});

export async function sendOTP(email: string, otp: string): Promise<Boolean> {

  const mailOptions = {
    from: 'Uberin',
    to: email,
    subject: 'OTP CODE',
    text: `Your OTP code is ${otp}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.log('send email error', error);
    return false;
  }

}