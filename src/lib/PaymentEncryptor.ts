import CryptoJS from "crypto-js";

// In a real app, put this in your .env file
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const PaymentEncryptor = {
  // Encrypts an object into a URL-safe string
  encrypt: <T extends object>(data: T): string => {
    console.log(SECRET_KEY);
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    // Make it URL safe (replace chars that break URLs)
    return encodeURIComponent(encrypted);
  },

  // Decrypts a string back into an object
  decrypt: <T> (cipherText: string): T | null => {
    console.log(SECRET_KEY);
    try {
      const decoded = decodeURIComponent(cipherText);
      const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(originalText);
    } catch (e) {
      console.error("Decryption failed", e);
      return null;
    }
  }
};