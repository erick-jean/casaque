import prisma from "../prisma";
import { Corretor, NewCorretor } from "../models/corretores";
import { Prisma } from "@prisma/client";

export async function getCorretores(): Promise<Corretor[]> {
    const result = await prisma.corretores.findMany();
    return result;
}

export async function getCorretorById(id: number): Promise<Corretor | null> {
    const result = await prisma.corretores.findUnique({ where: { id } });
    return result;
}

export async function checkCorretorExists(creci: string): Promise<boolean> {
    const result = await prisma.corretores.findUnique({ where: { creci } });
    return result !== null;
}

export async function postCorretores(corretor: NewCorretor): Promise<Corretor> {
    const newCorretor = await prisma.corretores.create({ data: corretor });
    return newCorretor;
}

export async function patchCorretor(id: number, data: Prisma.corretoresUpdateInput): Promise<Corretor | null> {
    const result = await prisma.corretores.update({ where: { id }, data });
    return result;
}

export async function deleteCorretor(id: number): Promise<Corretor | null> {
    const result = await prisma.corretores.delete({ where: { id } });
    return result;
}
