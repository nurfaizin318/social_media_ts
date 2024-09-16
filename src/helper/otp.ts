import { logger } from "../application/logging";

  interface OTPData {
    otp: string;
    expiry: number;
  }
  
  const otpStore: Record<string, OTPData> = {};

  export function generateOTP(length: number): string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  
  export function createOTP(length: number, expiryTime: number): OTPData {
    const otp = generateOTP(length);
    const expiry = Date.now() + expiryTime * 600000; // expiryTime dalam menit
    return { otp, expiry };
  }
  
  export function saveOTP(email: string, otpData: OTPData): void {
 
    otpStore[email] = otpData;
    console.log(`otp created ${otpStore[email].otp}`,)
  }
  
  export function validateOTP(email: string, otp: string): boolean {
    
    const otpData = otpStore[email]
   console.log(otpStore)
    console.log("otp request",otp)
    if (!otpData) {
      return false;
    }
    if (Date.now() > otpData.expiry) {
      delete otpStore[email];
      return false;
    }

    return otpData.otp === otp;
  }