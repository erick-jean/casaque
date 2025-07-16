import { Router } from 'express';
import { getImoveisController } from '../controllers/imoveis.controller';

const router = Router();

router.get('/imoveis', getImoveisController);

export default router;