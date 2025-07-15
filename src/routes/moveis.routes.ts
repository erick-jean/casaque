import { Router } from 'express';
import { getMoveis } from '../controllers/moveis.controller';

const router = Router();

router.get('/moveis', getMoveis);

export default router;