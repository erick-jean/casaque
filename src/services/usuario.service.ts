import prisma from "../prisma";
import { Usuario } from "../models/usuario.model";

export async function getUsers(): Promise<Usuario[]> {
  const result = await prisma.usuarios.findMany();
  return result;
}

export async function getUserById(id: number): Promise<Usuario | null> {
  return await prisma.usuarios.findUnique({
    where: {
      id: id,
    },
  });
}

export async function postUser(
  nome: string,
  email: string,
  telefone: string,
  cpf: string,
  tipo: string,
  data_nascimento: string,
  senha_hash: string
): Promise<Usuario> {
  return await prisma.usuarios.create({
    data: {
      nome: nome,
      email: email,
      telefone: telefone,
      cpf: cpf,
      tipo: tipo,
      data_nascimento: new Date(data_nascimento),
      senha_hash: senha_hash,
    },
  });
}

//Verifica se o usuário exeiste para criar um novo usuário
export async function checkUserExists(
  email: string,
  cpf: string
): Promise<boolean> {
  const result = await prisma.usuarios.findMany({
    where: {
      OR: [{ email: email }, { cpf: cpf }],
    },
  });
  return result.length > 0;
}

export async function deleteUser(id: number): Promise<Usuario | null> {
  return await prisma.usuarios.delete({
    where: {
      id: id,
    },
  });
}

// export async function deleteUsuarioById(id: number): Promise<boolean> {
//   const result = await pool.query(
//     `
//     DELETE FROM usuarios
//     WHERE id = $1
//   `,
//     [id]
//   );

//   // Retorna true se pelo menos 1 linha foi deletada
//   return (result.rowCount ?? 0) > 0;
// }

// export async function updateUsuario(
//   id: number,
//   dados: Partial<Omit<Usuario, "id" | "data_cadastro" | "senha_hash">>
// ): Promise<Usuario | null> {
//   if (Object.keys(dados).length === 0) return null;

//   const campos = Object.keys(dados);
//   const valores = Object.values(dados);

//   const setClause = campos.map((campo, i) => `${campo} = $${i + 1}`).join(", ");

//   const query = `
//     UPDATE usuarios
//     SET ${setClause}
//     WHERE id = $${valores.length + 1}
//     RETURNING id, nome, email, telefone, cpf
//   `;

//   const result = await pool.query(query, [...valores, id]);

//   return result.rows[0] || null;
// }
