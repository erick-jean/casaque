import { Imoveis, ImovelCreateInput } from "../models/imoveis.model";
import prisma from "../prisma";
import { mapImovelPrismaToModel } from "../utils/imovelMapper";

export async function getImoveis(): Promise<Imoveis[]> {
  const imoveisPrisma = await prisma.imoveis.findMany();
  return imoveisPrisma.map(mapImovelPrismaToModel);
}

export async function getImovelbyId(id: number): Promise<Imoveis | null> {
  const imovelPrisma = await prisma.imoveis.findUnique({ where: { id } });
  if (!imovelPrisma) return null;
  return mapImovelPrismaToModel(imovelPrisma);
}

export async function getImovelbyCorretorId(id: number): Promise<Imoveis[]> {
  const imoveisPrisma = await prisma.imoveis.findMany({ where: { id_corretor: id } });
  return imoveisPrisma.map(mapImovelPrismaToModel);
}

export async function postImovel(imovel: ImovelCreateInput): Promise<Imoveis | null> {
  const postImovel = await prisma.imoveis.create({ data: imovel });
  return mapImovelPrismaToModel(postImovel);
}

