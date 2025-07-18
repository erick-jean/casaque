import { Router } from 'express';
import { getCorretoresController, getCorretorByIdController, postCorretoresController, patchCorretorController } from '../controllers/corretores.controller';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/corretores', getCorretoresController);

router.get('/corretor/:id', getCorretorByIdController);

router.post('/corretor', postCorretoresController);

router.patch('/corretor/:id', authenticateToken, patchCorretorController);

export default router;
