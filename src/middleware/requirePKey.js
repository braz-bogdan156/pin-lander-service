import { REQUIRED_P_KEY } from '../config/env.js';

export default function requirePKey(req, res, next) {
  const p = req.query.p || req.headers['x-p-key'] || req.cookies.p;

  if (!p || p !== REQUIRED_P_KEY) {
    return res.redirect('https://google.com');
  }

  next();
}