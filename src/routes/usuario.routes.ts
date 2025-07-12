import { Router } from 'express';
import { getUsuarios, patchUsuario } from '../controllers/usuario.controller';
import { getUsuario } from '../controllers/usuario.controller';
import { deleteUsuario } from '../controllers/usuario.controller';
import { postUsuario } from '../controllers/usuario.controller';


const router = Router();

router.get('/usuarios', getUsuarios);

router.get('/usuario/:id', getUsuario);

router.delete('/usuario/:id', deleteUsuario);

router.post('/usuario', postUsuario);

router.patch('/usuario/:id', patchUsuario);

export default router;
