import { Router } from 'express';
import { getUsuariosController, getUserController, postUserController, deleteUserController } from '../controllers/usuario.controller';


const router = Router();

router.get('/usuarios', getUsuariosController);

router.get('/usuario/:id', getUserController);

router.delete('/usuario/:id', deleteUserController);

router.post('/usuarios', postUserController);

// router.patch('/usuario/:id', patchUsuario);

export default router;
