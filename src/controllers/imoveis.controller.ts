import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import { ImovelSchema } from "../schemas/imoveis.schema";
import {
  deleteImovel,
  getImoveis,
  getImovelbyCorretorId,
  getImovelbyId,
  getTiposImovel,
  getSubTiposImovel,
  getCaracteristicasImovel,
  postImovel,
  updateImovel,
  getImoveisFavoritos,
} from "../services/imoveis.service";
import { ImovelCreateInput, ImovelUpdateInput } from "../models/imoveis.model";

export async function getImoveisController(req: Request, res: Response) {
  const { cidade, estado, bairro } = req.query;
  try {
    const imoveis = await getImoveis({
      cidade: cidade?.toString(),
      estado: estado?.toString(),
      bairro: bairro?.toString(),
    });
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

export async function getImovelbyCorretorIdController(
  req: Request,
  res: Response
) {
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

export async function getTiposImovelController(req: Request, res: Response) {
  const tipos = await getTiposImovel();
  try {
    if(tipos) {
      return res.json(tipos);
    }
  } catch (error) {
    console.error("Erro ao buscar imoveis:", error);
    res.status(500).send({ error: "Erro no servidor", details: error });
  }
}

export async function getSubTiposImovelController(req: Request, res: Response) {
  const tipos = await getSubTiposImovel();
  try {
    if(tipos) {
      return res.json(tipos);
    }
  } catch (error) {
    console.error("Erro ao buscar imoveis:", error);
    res.status(500).send({ error: "Erro no servidor", details: error });
  }
}

export async function getCaracteristicasImovelController(req: Request, res: Response) {
  const tipos = await getCaracteristicasImovel();
  try {
    if(tipos) {
      return res.json(tipos);
    }
  } catch (error) {
    console.error("Erro ao buscar imoveis:", error);
    res.status(500).send({ error: "Erro no servidor", details: error });
  }
}

export async function getImoveisFavoritosController(req: Request, res: Response) {
  const tipos = await getImoveisFavoritos();
  try {
    if(tipos) {
      return res.json(tipos);
    }
  } catch (error) {
    console.error("Erro ao buscar imoveis:", error);
    res.status(500).send({ error: "Erro no servidor", details: error });
  }
}

export async function postImovelController(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const imovel: ImovelCreateInput = req.body;

    const newImovel = await postImovel(imovel);

    if (!newImovel) {
      return res.status(400).send({ error: "Erro ao criar imóvel" });
    }

    return res
      .status(201)
      .send({ message: "Imóvel criado com sucesso", imovel: newImovel });
  } catch (err) {
    console.error("Erro ao criar imóvel:", err);
    res.status(500).send({ error: "Erro no servidor", details: err });
  }
}

export async function deleteImovelController(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  try {
    const imovel = await getImovelbyId(id);
    if (!imovel) {
      return res.status(404).json({ error: "Imóvel não encontrado" });
    }
    const deleted = await deleteImovel(id);
    if (!deleted) {
      return res.status(400).send({ error: "Erro ao excluir imóvel" });
    }
    return res.json({ message: "Imóvel excluído com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir imóvel:", err);
    res.status(500).send({ error: "Erro no servidor", details: err });
  }
}

export async function updateImovelController(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const imovel = await getImovelbyId(id);
    if (!imovel) {
      return res.status(404).json({ error: "Imóvel não encontrado" });
    }

    const validation = ImovelSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: "Dados inválidos",
        details: validation.error.issues,
      });
    }

    const imovelRequest: ImovelUpdateInput = validation.data;

    const updated = await updateImovel(id, imovelRequest);

    if (!updated) {
      return res.status(400).send({ error: "Erro ao atualizar imóvel" });
    }

    return res.json({ message: "Imóvel atualizado com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar imóvel:", err);
    return res.status(500).json({ error: "Erro no servidor", details: err });
  }
}
