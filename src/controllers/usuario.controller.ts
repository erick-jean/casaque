import { Request, Response } from "express";
import {
  getUsers,
  getUserById,
  postUser,
  checkUserExists,
  deleteUser,
  patchUser,
  updatePassword,
} from "../services/usuario.service";
import { z } from "zod";
import bcrypt from "bcrypt";
import { error } from "console";
import {
  checkCorretorExists,
  postCorretores,
} from "../services/corretores.service";

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
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(8, "Telefone inválido"),
  cpf: z.string().min(11, "CPF inválido"),
  tipo: z.enum(["corretor", "particular", "imobiliaria"]), // exemplo de tipos
  data_nascimento: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de nascimento inválida",
  }),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
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
      return res.status(409).json({ message: "E-mail ou CPF já cadastrados" });
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

    if (newUser.tipo === "corretor") {
      const corretorData = req.body.corretors;
      if (!corretorData) {
        return res.status(400).json({ message: "Dados do corretor são obrigatórios" });
      }

      const { creci, creci_uf, data_registro, bio, ativo, id_imobiliaria } = corretorData;

      const checkCorretorExist = await checkCorretorExists(creci);
      if (checkCorretorExist) {
        return res.status(409).json({ message: "Corretor já cadastrado" });
      }

      try {
        await postCorretores({
          usuario_id: newUser.id,
          creci,
          creci_uf,
          data_registro: data_registro ?? new Date(),
          bio: bio ?? null,
          ativo: ativo ?? true,
          id_imobiliaria: id_imobiliaria ?? null,
        });
      } catch (error) {
        console.error("Erro ao criar corretor:", error);
        return res.status(500).json({ message: "Erro interno ao criar corretor" });
      }
    }

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ message: "Erro interno ao criar usuário" });
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

const updateSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email().optional(),
  telefone: z.string().optional(),
  cpf: z.string().optional(),
  tipo: z.string().optional(),
  data_nascimento: z.date().optional(),
});

export async function patchUsuarioController(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const validated = updateSchema.parse(req.body);

    // Converte data_nascimento, se existir
    if (validated.data_nascimento) {
      validated.data_nascimento = new Date(validated.data_nascimento);
    }

    const usuarioAtualizado = await patchUser(id, validated);
    return res.json(usuarioAtualizado);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ error: "Erro ao atualizar usuário", details: err });
  }
}

export async function updatePasswordController(req: Request, res: Response) {
  const id = parseInt(req.params.id, 10);
  const { actualPassword, newPassword } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  if (!actualPassword || !newPassword) {
    return res
      .status(400)
      .json({ error: "Senha atual e nova senha são obrigatórias" });
  }

  try {
    await updatePassword(id, actualPassword, newPassword); // ✅ envia as senhas cruas
    return res.json({ message: "Senha atualizada com sucesso" });
  } catch (err: any) {
    console.error(err);
    return res
      .status(400)
      .json({ error: "Erro ao atualizar senha", details: err.message });
  }
}
