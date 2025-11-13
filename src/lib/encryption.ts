import crypto from "crypto";

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET!;
const IV_LENGTH = 16;

// Create a proper 32-byte key from your secret
function getKey() {
  return crypto.createHash("sha256").update(ENCRYPTION_SECRET).digest();
}

export function encrypt(text: string) {
  if (!text) return ""; // Handle empty strings

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    getKey(), // Use the hashed key
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text: string) {
  if (!text) return ""; // Handle empty strings

  const [ivHex, encryptedHex] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    getKey(), // Use the hashed key
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
