import { Imoveis } from "../models/imoveis.model";
import { imoveis as ImovelPrisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export function mapImovelPrismaToModel(imovel: ImovelPrisma): Imoveis {
  return {
    ...imovel,
    preco: (imovel.preco as Decimal).toNumber(),
    valor_iptu: imovel.valor_iptu?.toNumber() ?? null,
    valor_condominio: imovel.valor_condominio?.toNumber() ?? null,
    area_util_hectares: imovel.area_util_hectares?.toNumber() ?? null,
    area_total_hectares: imovel.area_total_hectares?.toNumber() ?? null,
    area_privativa: imovel.area_privativa?.toNumber() ?? null,
    area_comum: imovel.area_comum?.toNumber() ?? null,
    latitude: imovel.latitude?.toNumber() ?? null,
    longitude: imovel.longitude?.toNumber() ?? null,
  };
}
