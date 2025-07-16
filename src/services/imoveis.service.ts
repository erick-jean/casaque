import { Imoveis } from "../models/imoveis.model";
import prisma from "../prisma";

export async function getImoveis(): Promise<Imoveis[]> {  
  const imoveisPrisma = await prisma.imoveis.findMany();
  
  const imoveis: Imoveis[] = imoveisPrisma.map((imovel) => ({
    ...imovel,
    preco: imovel.preco.toNumber(),
    valor_iptu: imovel.valor_iptu?.toNumber() ?? null,
    valor_condominio: imovel.valor_condominio?.toNumber() ?? null,
    area_util_hectares: imovel.area_util_hectares?.toNumber() ?? null,
    area_total_hectares: imovel.area_total_hectares?.toNumber() ?? null,
    area_privativa: imovel.area_privativa?.toNumber() ?? null,
    area_comum: imovel.area_comum?.toNumber() ?? null,
    latitude: imovel.latitude?.toNumber() ?? null,
    longitude: imovel.longitude?.toNumber() ?? null,
    // converter outros Decimal que tiver no modelo
  }));

  return imoveis;
}

