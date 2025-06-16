import Usuarios from '../models/usuariosModel.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, fotoPerfil, tipoPerfil } = req.body;

    // Verifica se o email já está cadastrado
    const usuarioExistente = await Usuarios.getAll();
    if (usuarioExistente.some((usuario) => usuario.email === email)) {
      return res.status(400).json({ mensagem: 'Email já cadastrado.' });
    }

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const novoUsuario = {
      nome,
      email,
      senha: senhaCriptografada,
      fotoPerfil: fotoPerfil || null,
      tipoPerfil: tipoPerfil || 'leitor',
    };

    const usuarioId = await Usuarios.create(novoUsuario);
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.', id: usuarioId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuário.' });
  }
};

export const recuperarSenha = async (req, res) => {
  try {
    const { email } = req.body;

    // Verifica se o email existe
    const usuario = (await Usuarios.getAll()).find((u) => u.email === email);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Email não encontrado.' });
    }

    // Gera um token de recuperação
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpires = new Date(Date.now() + 3600000); // 1 hora de validade

    // Atualiza o token no banco de dados
    await Usuarios.update(usuario.id, { resetToken: token, resetTokenExpires: tokenExpires });

    // Retorna o token na resposta
    res.status(200).json({ mensagem: 'Token gerado com sucesso.', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao processar recuperação de senha.' });
  }
};

export const validarToken = async (req, res) => {
  try {
    const { token } = req.body;

    // Verifica se o token é válido
    const usuario = (await Usuarios.getAll()).find(
      (u) => u.resetToken === token && new Date(u.resetTokenExpires) > new Date()
    );

    if (!usuario) {
      return res.status(400).json({ mensagem: 'Token inválido ou expirado.' });
    }

    res.status(200).json({ mensagem: 'Token válido.', usuarioId: usuario.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao validar token.' });
  }
};

export const redefinirSenha = async (req, res) => {
  try {
    const { usuarioId, novaSenha } = req.body;

    // Criptografa a nova senha
    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);

    // Atualiza a senha no banco de dados
    await Usuarios.update(usuarioId, { senha: senhaCriptografada, resetToken: null, resetTokenExpires: null });

    res.status(200).json({ mensagem: 'Senha redefinida com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao redefinir senha.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o email existe
    const usuario = (await Usuarios.getAll()).find((u) => u.email === email);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Email não encontrado.' });
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Senha incorreta.' });
    }

    // Gera um token JWT (opcional)
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({ mensagem: 'Login realizado com sucesso.', token, usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao realizar login.' });
  }
};