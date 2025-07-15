import { Request, Response } from "express";
import { listMoveis } from "../services/moveis.service";

export async function getMoveis(req: Request, res: Response) {
    try {
        const moveis = await listMoveis();
        res.json(moveis);
    } catch (err) {
        console.error("Erro ao buscar moveis:", err);
        res.status(500).send("Erro no servidor");
    }
}