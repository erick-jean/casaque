export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha_hash: string;
  telefone: string;
  cpf: string;
  tipo: string;
  data_cadastro?: Date | null;
  data_nascimento: Date | null;
}