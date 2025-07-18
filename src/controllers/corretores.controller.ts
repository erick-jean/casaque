import { Request, Response } from "express";
import { checkCorretorExists, getCorretorById, getCorretores, patchCorretor, postCorretores } from "../services/corretores.service";
import { NewCorretor } from "../models/corretores";

export async function getCorretoresController(req: Request, res: Response) {
  try {
    const corretores = await getCorretores();
    res.json(corretores);
  } catch (err) {
    console.error("Erro ao buscar corretores:", err);
    res.status(500).send("Erro no servidor");
  }
}

export async function getCorretorByIdController(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido" });
  }
  try {
    const corretor = await getCorretorById(id);
    if (corretor) {
      res.json(corretor);
    } else {
      res.status(404).json({ error: "Corretor não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar corretor:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
}

export async function postCorretoresController(req: Request, res: Response) {
  const newCorretor: NewCorretor = req.body;

  const corretor = await checkCorretorExists(newCorretor.creci);
  if (corretor) {
    res.status(400).json({ error: "Corretor já cadastrado" });
  } else {
    try {
      const result = await postCorretores(newCorretor);
      res.status(201).json(result);
    } catch (error) {
      console.error("Erro ao cadastrar corretor:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  }
}

export async function patchCorretorController(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido" });
  }
  const data = req.body;
  try {
    const corretor = await patchCorretor(id, data);
    if (corretor) {
      res.json(corretor);
    } else {
      res.status(404).json({ error: "Corretor não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar corretor:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
}
