import { Prisma } from "@prisma/client";
import { Imoveis, ImovelCreateInput, ImovelUpdateInput } from "../models/imoveis.model";
import prisma from "../prisma";
import { mapImovelPrismaToModel } from "../utils/imovelMapper";

export async function getImoveis(filters?: {
  cidade?: string;
  estado?: string;
  bairro?: string;
}): Promise<Imoveis[]> {
  const imoveisPrisma = await prisma.imoveis.findMany({
    where: {
      cidade: filters?.cidade,
      estado: filters?.estado,
      bairro: filters?.bairro,
    },
  });

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

export async function deleteImovel(id: number): Promise<Imoveis | null> {
  const deleteImovel = await prisma.imoveis.delete({ where: { id } });
  return mapImovelPrismaToModel(deleteImovel);
}

export async function updateImovel(id: number, imovel: Prisma.imoveisUpdateInput): Promise<Imoveis> {
  const updateImovel = await prisma.imoveis.update({ where: { id }, data: imovel });
  return mapImovelPrismaToModel(updateImovel);
}



