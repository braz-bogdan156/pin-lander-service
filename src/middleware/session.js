import crypto from 'crypto';
import attemptsStore from '../utils/attemptsStore.js';

export function getSession(req, res) {
  let sid = req.cookies.sid;

  if (!sid) {
    sid = crypto.randomBytes(12).toString('hex');
    res.cookie('sid', sid, {
      httpOnly: true,
      sameSite: 'Lax',
    });
  }

  if (!attemptsStore[sid]) {
    attemptsStore[sid] = { attempts: 0 };
  }

  return sid;
}