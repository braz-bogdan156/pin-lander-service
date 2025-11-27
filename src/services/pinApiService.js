import axios from 'axios';
import { PIN_API_BASE, PIN_API_TOKEN } from '../config/env.js';

export async function initPin(payload) {
  return axios.post(`${PIN_API_BASE}/init`, payload, {
    headers: { Authorization: `Bearer ${PIN_API_TOKEN}` },
    timeout: 15000,
  });
}

export async function verifyPin(requestId, pin) {
  return axios.post(`${PIN_API_BASE}/verify`, { request_id: requestId, pin }, {
    headers: { Authorization: `Bearer ${PIN_API_TOKEN}` },
    timeout: 15000,
  });
}