// lib/decryptOnServer.ts
import { createDecipheriv, pbkdf2Sync } from "crypto";

// Use NEXT_PUBLIC_ENCRYPTION_KEY which is available everywhere
const SERVER_ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY ||
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY ||
  "9d3b79b2794f88f60d876130864793ba687fd277c846c90edf07d444eaf09e9d";

function getDerivedKeySync(): Buffer {
  if (!SERVER_ENCRYPTION_KEY) {
    throw new Error("ENCRYPTION_KEY not found in environment variables");
  }

  const salt = Buffer.from("salt-value", "utf-8");
  return pbkdf2Sync(SERVER_ENCRYPTION_KEY, salt, 100000, 32, "sha256");
}

export function decryptOnServer(encryptedText: string): string {
  if (!encryptedText) return "";

  try {
    // Decode from base64
    const combined = Buffer.from(encryptedText, "base64");

    // Extract IV (first 12 bytes)
    const iv = combined.subarray(0, 12);

    // Everything after IV is the encrypted data from Web Crypto
    const encryptedDataWithTag = combined.subarray(12);

    // Get derived key
    const key = getDerivedKeySync();

    // Create decipher
    const decipher = createDecipheriv("aes-256-gcm", key, iv);

    // Split auth tag (last 16 bytes) from ciphertext
    const authTagLength = 16;
    const ciphertext = encryptedDataWithTag.subarray(
      0,
      encryptedDataWithTag.length - authTagLength
    );
    const authTag = encryptedDataWithTag.subarray(
      encryptedDataWithTag.length - authTagLength
    );

    // Set the auth tag
    decipher.setAuthTag(authTag);

    // Decrypt
    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);

    return decrypted.toString("utf-8");
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("INVALID_API_KEY_ENCRYPTION");
  }
}
