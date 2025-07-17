import { Request, Response } from "express";
import {
  getImoveis,
  getImovelbyCorretorId,
  getImovelbyId,
  postImovel,
} from "../services/imoveis.service";
import { ImovelCreateInput } from "../models/imoveis.model";

export async function getImoveisController(req: Request, res: Response) {
  const imoveis = await getImoveis();
  try {
    res.json(imoveis);
  } catch (err) {
    console.error("Erro ao buscar todos os imoveis:", err);
    res.status(500).send({ error: "Erro no servidor", details: err });
  }
}

export async function getImovelIdController(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  try {
    const imovel = await getImovelbyId(id);
    res.json(imovel);
  } catch (err) {
    console.error("Erro ao buscar imovel:", err);
    res.status(500).send({ error: "Erro no servidor", details: err });
  }
}

export async function getImovelbyCorretorIdController(req: Request, res: Response) {
  const corretorId = parseInt(req.params.id, 10);
  if (isNaN(corretorId)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  try {
    const imoveisCorretor = await getImovelbyCorretorId(corretorId);
    res.json(imoveisCorretor);
  } catch (err) {
    console.error("Erro ao buscar imoveis do proprietário:", err);
    res.status(500).send({ error: "Erro no servidor", details: err });
  }
}

export async function postImovelController(req: Request, res: Response) {
  try {
    const imovel: ImovelCreateInput = req.body;
    const newImovel = await postImovel(imovel);

    if (!newImovel) {
      return res.status(400).send({ error: "Erro ao criar imovel" });
    }

    return res.status(201).send({ message: "Imovel criado com sucesso" });

  } catch (err) {
    console.error("Erro ao criar imovel:", err);
    res.status(500).send({ error: "Erro no servidor", details: err });
  }
}
