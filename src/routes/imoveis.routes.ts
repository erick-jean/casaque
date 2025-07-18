import { Router } from "express";
import { authenticateToken } from "../middlewares/auth";
import {
  getImoveisController,
  getImovelIdController,
  postImovelController,
  getImovelbyCorretorIdController,
  deleteImovelController,
  updateImovelController
} from "../controllers/imoveis.controller";

const router = Router();

router.get("/imoveis", getImoveisController);

router.get("/imovel/:id", getImovelIdController);

router.get("/imoveis/corretor/:id", getImovelbyCorretorIdController);

router.post("/imovel", authenticateToken, postImovelController);

router.delete("/imovel/:id", authenticateToken, deleteImovelController);

router.patch("/imovel/:id",authenticateToken, updateImovelController);

export default router;
