import pool from "../../config/db";
import { Usuario } from "../models/usuario.model";

export async function listUsuers(): Promise<Usuario[]> {
  const result = await pool.query(`
    SELECT id, nome, email, telefone, cpf, tipo, data_cadastro, data_nascimento
    FROM usuarios
    `);
  return result.rows;
}

export async function getUsuarioById(id: number): Promise<Usuario | null> {
  const result = await pool.query(
    `
    SELECT id, nome, email, telefone, cpf, tipo, data_cadastro, data_nascimento
    FROM usuarios
    WHERE id = $1
    `,
    [id]
  );
  return result.rows[0] || null;
}

export async function deleteUsuarioById(id: number): Promise<boolean> {
  const result = await pool.query(
    `
    DELETE FROM usuarios
    WHERE id = $1
  `,
    [id]
  );

  // Retorna true se pelo menos 1 linha foi deletada
  return (result.rowCount ?? 0) > 0;
}

export async function createUsuario(
  nome: string,
  email: string,
  telefone: string,
  cpf: string,
  tipo: string,
  data_nascimento: string, // mudei para string pois vem "1990-01-01"
  senha_hash: string // mudei para senha_hash
): Promise<Usuario> {
  const data_nascimento_date = new Date(data_nascimento); // converte string para Date

  const result = await pool.query(
    `
    INSERT INTO usuarios (nome, email, senha_hash, telefone, cpf, tipo, data_cadastro, data_nascimento)
    VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)
    RETURNING id, nome, email, telefone, cpf, tipo, data_cadastro, data_nascimento
    `,
    [nome, email, senha_hash, telefone, cpf, tipo, data_nascimento_date]
  );

  return result.rows[0];
}

// 🛡️ Verifica duplicação por e-mail ou CPF
export async function usuarioExistePorEmailOuCpf(
  email: string,
  cpf: string
): Promise<boolean> {
  const result = await pool.query(
    `SELECT 1 FROM usuarios WHERE email = $1 OR cpf = $2 LIMIT 1`,
    [email, cpf]
  );
  return (result.rowCount ?? 0) > 0;
}
