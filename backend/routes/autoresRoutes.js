import express from 'express';
import { listarAutores, cadastrarAutor, detalhesAutor, editarAutor, excluirAutor } from '../controllers/autoresController.js';

const router = express.Router();

// Rota para listar autores
router.get('/', listarAutores);

// Rota para cadastrar autor
router.post('/', cadastrarAutor);

// Rota para buscar detalhes de um autor
router.get('/:id', detalhesAutor);

// Rota para editar autor
router.put('/:id', editarAutor);

// Rota para excluir autor
router.delete('/:id', excluirAutor);

export default router;