import { Router } from 'express';
import { getUsuarios } from '../controllers/usuario.controller';
import { getUsuario } from '../controllers/usuario.controller';
import { deleteUsuario } from '../controllers/usuario.controller';
import { postUsuario } from '../controllers/usuario.controller';


const router = Router();

router.get('/usuarios', getUsuarios);

router.get('/usuarios/:id', getUsuario);

router.delete('/usuarios/:id', deleteUsuario);

router.post('/usuarios', postUsuario);

export default router;
