import express from 'express';
import { cadastrarUsuario, recuperarSenha, validarToken, redefinirSenha, login } from '../controllers/usuariosController.js';

const router = express.Router();

// Rota para cadastro de usuário
router.post('/cadastro', cadastrarUsuario);

// Rota para recuperação de senha
router.post('/recuperar-senha', recuperarSenha);

// Rota para validar token
router.post('/validar-token', validarToken);

// Rota para redefinir senha
router.post('/redefinir-senha', redefinirSenha);

// Rota para login
router.post('/login', login);

export default router;