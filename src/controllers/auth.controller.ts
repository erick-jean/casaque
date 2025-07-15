import { Request, Response } from 'express';
import prisma from '../prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  const usuario = await prisma.usuarios.findUnique({
    where: { email },
  });

  if (!usuario) {
    return res.status(401).json({ error: 'Usuário não encontrado' });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

  if (!senhaCorreta) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  const token = jwt.sign(
    { id: usuario.id, tipo: usuario.tipo }, // payload
    process.env.JWT_SECRET as string,       // chave secreta
    { expiresIn: '2h' }
  );

  res.json({ token });
}
