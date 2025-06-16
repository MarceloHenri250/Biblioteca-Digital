import express from 'express';
import { listarLivros, cadastrarLivro, detalhesLivro, editarLivro, excluirLivro } from '../controllers/livrosController.js';

const router = express.Router();

// Rota para listar livros
router.get('/', listarLivros);

// Rota para cadastrar livro
router.post('/', cadastrarLivro);

// Rota para buscar detalhes de um livro
router.get('/:id', detalhesLivro);

// Rota para editar livro
router.put('/:id', editarLivro);

// Rota para excluir livro
router.delete('/:id', excluirLivro);

export default router;
