import { Router } from "express";
import { authenticateToken } from "../middlewares/auth";
import {
  getImoveisController,
  getImovelIdController,
  postImovelController,
  getImovelbyCorretorIdController,
  getTiposImovelController,
  getSubTiposImovelController,
  getCaracteristicasImovelController,
  getImoveisFavoritosController,
  deleteImovelController,
  updateImovelController,
  
} from "../controllers/imoveis.controller";

const router = Router();

router.get("/imoveis", getImoveisController);

router.get("/imovel/:id", getImovelIdController);

router.get("/imoveis/corretor/:id", getImovelbyCorretorIdController);

router.get("/imoveis/tipos", getTiposImovelController);

router.get("/imoveis/subtipos", getSubTiposImovelController);

router.get("/imoveis/caracteristicas", getCaracteristicasImovelController);

router.get("/imoveis/favoritos", authenticateToken, getImoveisFavoritosController);

router.post("/imovel", authenticateToken, postImovelController);

router.delete("/imovel/:id", authenticateToken, deleteImovelController);

router.patch("/imovel/:id",authenticateToken, updateImovelController);

export default router;
