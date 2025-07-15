import { Router } from 'express';
import { getUsuariosController, getUserController, postUserController, deleteUserController, patchUsuarioController, updatePasswordController } from '../controllers/usuario.controller';


const router = Router();

router.get('/usuarios', getUsuariosController);

router.get('/usuario/:id', getUserController);

router.delete('/usuario/:id', deleteUserController);

router.post('/usuarios', postUserController);

router.patch('/usuario/:id', patchUsuarioController);

router.patch('/usuario/:id/senha', updatePasswordController);

export default router;
