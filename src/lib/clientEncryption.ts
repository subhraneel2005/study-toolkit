// lib/clientEncryption.ts
// This runs in the browser using Web Crypto API

// You can use the SAME encryption key, just expose it as NEXT_PUBLIC_
// It's safe because we're doing TWO layers of encryption:
// 1. Client encrypts with this key
// 2. Server re-encrypts with ENCRYPTION_SECRET (which stays private)

const CLIENT_ENCRYPTION_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "your-public-key-min-32-chars!!";

async function getDerivedKey(forEncryption: boolean = true) {
  const encoder = new TextEncoder();

  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(CLIENT_ENCRYPTION_KEY),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("salt-value"), // In production, use a better salt
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    forEncryption ? ["encrypt"] : ["decrypt"]
  );
}

export async function encryptOnClient(text: string): Promise<string> {
  if (!text) return "";

  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const key = await getDerivedKey(true);

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  // Combine IV and encrypted data
  const combined = new Uint8Array(iv.length + encryptedData.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encryptedData), iv.length);

  // Convert to base64
  return btoa(String.fromCharCode(...combined));
}

export async function decryptOnClient(encryptedText: string): Promise<string> {
  if (!encryptedText) return "";

  try {
    // Decode from base64
    const combined = Uint8Array.from(atob(encryptedText), (c) =>
      c.charCodeAt(0)
    );

    // Extract IV and encrypted data
    const iv = combined.slice(0, 12);
    const encryptedData = combined.slice(12);

    const key = await getDerivedKey(false);

    const decryptedData = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encryptedData
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch (error) {
    console.error("Decryption failed:", error);
    return "";
  }
}
