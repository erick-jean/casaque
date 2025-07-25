export interface Imoveis {
  id: number;
  titulo: string;
  descricao: string | null;
  subtipo_id: number;
  tipoimovel_id: number;
  preco?: number | null;
  area?: number | null;
  quartos?: number | null;
  banheiros?: number | null;
  vagas_garagem?: number | null;
  endereco: string;
  numero?: string | null;
  complemento?: string | null;
  bairro: string;
  cidade: string;
  estado: string;
  estado_id?: number | null;
  cep?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  data_cadastro?: Date | null;
  data_atualizacao?: Date | null;
  disponivel?: boolean | null;
  destaque?: boolean | null;
  imagens?: string[];
  id_proprietario?: number | null;
  id_corretor?: number | null;
  area_util_hectares?: number | null;
  area_total_hectares?: number | null;
  salas?: number | null;
  andar?: number | null;
  area_privativa?: number | null;
  area_comum?: number | null;
  suites?: number | null;
  mobiliado?: boolean | null;
  aceita_animais?: boolean | null;
  views?: number | null;
  valor_iptu?: number | null;
  valor_condominio?: number | null;
}

export type ImovelCreateInput = Omit<Imoveis, "id">;

export type ImovelUpdateInput = Partial<ImovelCreateInput>;
