import { Request, Response } from "express";
import { getUsers, getUserById, postUser, checkUserExists, deleteUser } from "../services/usuario.service";
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { error } from "console";

// Busca todos os usuários
export async function getUsuariosController(req: Request, res: Response) {
  try {
    const usuarios = await getUsers();
    res.json(usuarios);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    res.status(500).send("Erro no servidor");
  }
}

export async function getUserController(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  try {
    const usuario = await getUserById(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
}

// Esquema de validação com Zod
const usuarioSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().min(8, 'Telefone inválido'),
  cpf: z.string().min(11, 'CPF inválido'),
  tipo: z.enum(['corretor', 'particular', 'imobiliaria']), // exemplo de tipos
  data_nascimento: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Data de nascimento inválida',
  }),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

// // Cria um novo usuário
export async function postUserController(req: Request, res: Response) {
  try {
    const parse = usuarioSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ errors: parse.error.format() });
    }

    const { nome, email, telefone, cpf, tipo, data_nascimento, senha } = parse.data;

    // Verifica se e-mail ou CPF já existem
    const verification = await checkUserExists(email, cpf);
    if (verification) {
      return res.status(409).json({ message: 'E-mail ou CPF já cadastrados' });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const newUser = await postUser(
      nome,
      email,
      telefone,
      cpf,
      tipo,
      data_nascimento,
      senha_hash
    );

    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno ao criar usuário' });
  }
}

export async function deleteUserController(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  try {
    const usuario = await getUserById(id);
    if (usuario) {
      // Usuário encontrado e excluído — envia mensagem de sucesso
      await deleteUser(id);
      return res.json({ message: "Usuário excluído com sucesso" });
    } else {
      // Usuário não encontrado
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
}


// // Exclui um usuário pelo ID
// export async function deleteUsuario(req: Request, res: Response) {
//   const id = parseInt(req.params.id, 10);
//   if (isNaN(id)) {
//     return res.status(400).json({ error: "ID inválido" });
//   }

//   try {
//     const usuario = await deleteUsuarioById(id);

//     if (usuario) {
//       // Usuário encontrado e excluído — envia mensagem de sucesso
//       return res.json({ message: "Usuário excluído com sucesso" });
//     } else {
//       // Usuário não encontrado
//       return res.status(404).json({ error: "Usuário não encontrado" });
//     }

//   } catch (err) {
//     console.error("Erro ao excluir usuário:", err);
//     res.status(500).json({ error: "Erro no servidor" });
//   }
// }

// export async function patchUsuario(req: Request, res: Response) {
//   const id = parseInt(req.params.id, 10);
//   const dados = req.body;

//   if (isNaN(id)) {
//     return res.status(400).json({ error: "ID inválido" });
//   }

//   if (!dados || Object.keys(dados).length === 0) {
//     return res.status(400).json({ error: "Nenhum campo enviado para atualização" });
//   }

//   try {
//     const usuario = await updateUsuario(id, dados);

//     if (!usuario) {
//       return res.status(404).json({ error: "Usuário não encontrado ou sem dados para atualizar" });
//     }

//     res.json(usuario);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Erro ao atualizar usuário" });
//   }
// }


