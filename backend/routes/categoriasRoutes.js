import express from 'express';
import { listarCategorias, cadastrarCategoria, detalhesCategoria, editarCategoria, excluirCategoria } from '../controllers/categoriasController.js';

const router = express.Router();

// Rota para listar categorias
router.get('/', listarCategorias);

// Rota para cadastrar categoria
router.post('/', cadastrarCategoria);

// Rota para buscar detalhes de uma categoria
router.get('/:id', detalhesCategoria);

// Rota para editar categoria
router.put('/:id', editarCategoria);

// Rota para excluir categoria
router.delete('/:id', excluirCategoria);

export default router;
