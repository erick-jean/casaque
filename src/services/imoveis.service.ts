import { Prisma } from "@prisma/client";
import {
  Imoveis,
  ImovelCreateInput,
  ImovelUpdateInput,
} from "../models/imoveis.model";
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
  const imoveisPrisma = await prisma.imoveis.findMany({
    where: { id_corretor: id },
  });
  return imoveisPrisma.map(mapImovelPrismaToModel);
}

export async function getTiposImovel() {
  const tipos_imovel = await prisma.tipos_imovel.findMany();
  return tipos_imovel;
}

export async function getSubTiposImovel() {
  const subtipos_imovel = await prisma.subtipos_imovel.findMany();
  return subtipos_imovel;
}

export async function getCaracteristicasImovel() {
  const caracteristicas = await prisma.caracteristicas.findMany();
  return caracteristicas;
}

export async function getImoveisFavoritos() {
  const favoritos = await prisma.favoritos.findMany();
  return favoritos;
}

export async function postFavoritos(usuario_id: number, imovel_id: number) {
  const usuario = await prisma.usuarios.findUnique({
    where: { id: usuario_id },
  });
  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  const imovel = await prisma.imoveis.findUnique({ where: { id: imovel_id } });
  if (!imovel) {
    throw new Error("Imóvel não encontrado");
  }
  const favorito = await prisma.favoritos.create({
    data: { usuario_id: usuario_id, imovel_id: imovel_id },
  });
  return favorito;
}

// Verifica se o imovel ja foi favoritado
export async function isFavorito(
  usuario_id: number,
  imovel_id: number
): Promise<boolean> {
  const favorito = await prisma.favoritos.findFirst({
    where: {
      usuario_id: usuario_id,
      imovel_id: imovel_id,
    },
  });

  return !!favorito;
}

export async function deleteFavoritos(id: number) {
  const deleteFavorito = await prisma.favoritos.delete({ where: { id } });
  return deleteFavorito;
}

export async function postImovel(
  imovel: ImovelCreateInput
): Promise<Imoveis | null> {
  const postImovel = await prisma.imoveis.create({ data: imovel });
  return mapImovelPrismaToModel(postImovel);
}

export async function deleteImovel(id: number): Promise<Imoveis | null> {
  const deleteImovel = await prisma.imoveis.delete({ where: { id } });
  return mapImovelPrismaToModel(deleteImovel);
}

export async function updateImovel(
  id: number,
  imovel: Prisma.imoveisUpdateInput
): Promise<Imoveis> {
  const updateImovel = await prisma.imoveis.update({
    where: { id },
    data: imovel,
  });
  return mapImovelPrismaToModel(updateImovel);
}
