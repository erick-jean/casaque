import { Request, Response } from "express";
import { getImoveis } from "../services/imoveis.service";

export async function getImoveisController(req: Request, res: Response) {
    const imoveis = await getImoveis();   
    try {
        res.json(imoveis);
    } catch (err) {
        console.error("Erro ao buscar todos os imoveis:", err);
        res.status(500).send({error: "Erro no servidor", details: err});
    }
}