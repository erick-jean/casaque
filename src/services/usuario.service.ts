import prisma from "../prisma";
import { Usuario } from "../models/usuario.model";
import { Prisma } from "@prisma/client";
import bcrypt from 'bcrypt';

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

export async function patchUser(
  id: number,
  data: Prisma.usuariosUpdateInput
): Promise<Usuario | null> {
  return await prisma.usuarios.update({
    where: { id },
    data,
  });
}

export async function updatePassword(id: number, actualPassword: string, newPassword: string) {
  const user = await prisma.usuarios.findUnique({ where: { id } });
  if (!user) throw new Error('Usuário não encontrado');

  const correctPassword = await bcrypt.compare(actualPassword, user.senha_hash);
  if (!correctPassword) throw new Error('Senha atual incorreta');

  const newHash = await bcrypt.hash(newPassword, 10);

  return await prisma.usuarios.update({
    where: { id },
    data: { senha_hash: newHash },
  });
}