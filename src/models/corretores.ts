export interface Corretor {
  id: number;
  usuario_id: number;
  creci: string;
  creci_uf: string;
  data_registro: Date;
  bio?: string | null;
  ativo: boolean | null;
  id_imobiliaria: number | null;
}

export type NewCorretor = Omit<Corretor, "id">;