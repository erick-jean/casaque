import { Router } from 'express';
import { getImoveisController, getImovelIdController, postImovelController, getImovelbyCorretorIdController } from '../controllers/imoveis.controller';

const router = Router();

router.get('/imoveis', getImoveisController);

router.get('/imovel/:id', getImovelIdController);

router.get('/imoveis/corretor/:id', getImovelbyCorretorIdController);

router.post('/imovel', postImovelController);

//router.get('/imoveis/proprietario/:id', getImovelbyProprietarioIdController);

export default router;