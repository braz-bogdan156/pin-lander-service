import crypto from 'crypto';
import { AES_KEY, AES_IV } from '../config/env.js';

export function decryptOffer(encrypted) {
  try {
    const key = Buffer.from(AES_KEY, 'utf8');
    const iv = Buffer.from(AES_IV, 'utf8');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch {
    return null;
  }
}