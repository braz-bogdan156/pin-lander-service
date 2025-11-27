import { decryptOffer } from '../services/cryptoService.js';
import { validatePhone } from '../services/phoneService.js';
import { initPin } from '../services/pinApiService.js';
import { getSession } from '../middleware/session.js';

export async function initController(req, res) {
  const { phone, country = 'OM', offer } = req.body;
  const sessionId = getSession(req, res);

  if (!phone) {
    return res.status(400).json({ ok: false, message: 'no_phone' });
  }

  const offerId = offer ? decryptOffer(offer) : null;

  const validated = validatePhone(phone, country);
  if (!validated.ok) {
    return res.status(400).json({ ok: false, message: 'invalid_phone' });
  }

  try {
    const apiRes = await initPin({
      phone: validated.e164,
      offer_id: offerId,
      country,
    });

    const requestId = apiRes.data.request_id;
    if (requestId) {
      res.cookie('pin_request_id', requestId, { httpOnly: true });
    }

    return res.json({ ok: true, data: apiRes.data });

  } catch (err) {
    return res.status(500).json({ ok: false, message: 'api_error' });
  }
}