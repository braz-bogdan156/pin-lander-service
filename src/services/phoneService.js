import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function validatePhone(phone, country) {
  const parsed = parsePhoneNumberFromString(phone, country);

  if (!parsed) return { ok: false };
  return {
    ok: parsed.isValid(),
    e164: parsed.format('E.164'),
  };
}