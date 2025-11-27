import attemptsStore from '../utils/attemptsStore.js';
import { verifyPin } from '../services/pinApiService.js';
import { getSession } from '../middleware/session.js';

export async function verifyController(req, res) {
  const { pin } = req.body;
  const requestId = req.cookies.pin_request_id;

  if (!pin) return res.status(400).json({ ok: false, message: 'no_pin' });
  if (!requestId) return res.status(400).json({ ok: false, message: 'no_request' });

  const sessionId = getSession(req, res);
  const session = attemptsStore[sessionId];

  if (session.attempts >= 3) {
    return res.json({ ok: false, redirect: 'https://google.com' });
  }

  try {
    const apiRes = await verifyPin(requestId, pin);

    if (apiRes.data?.ok && apiRes.data?.subscribed) {
      return res.json({
        ok: true,
        redirect: apiRes.data.content_link || 'https://google.com',
      });
    }

    session.attempts++;

    if (session.attempts >= 3) {
      return res.json({ ok: false, redirect: 'https://google.com' });
    }

    return res.status(400).json({ ok: false, message: 'invalid_pin' });

  } catch (err) {
    session.attempts++;

    if (session.attempts >= 3) {
      return res.json({ ok: false, redirect: 'https://google.com' });
    }

    return res.status(500).json({ ok: false, message: 'api_error' });
  }
}