import { Router } from 'express';
import requirePKey from '../middleware/requirePKey.js';
import { initController } from '../controllers/initController.js';
import { verifyController } from '../controllers/verifyController.js';

const router = Router();

router.use(requirePKey);

router.post('/init', initController);
router.post('/verify', verifyController);

export default router;