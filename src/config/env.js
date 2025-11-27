import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const PIN_API_BASE = process.env.PIN_API_BASE;
export const PIN_API_TOKEN = process.env.PIN_API_TOKEN;
export const REQUIRED_P_KEY = process.env.REQUIRED_P_KEY;
export const AES_KEY = process.env.AES_KEY;
export const AES_IV = process.env.AES_IV;
export const TEST_IP = process.env.TEST_IP;
export const TEST_MSISDN = process.env.TEST_MSISDN;
export const TEST_OFFER_ID = process.env.TEST_OFFER_ID;