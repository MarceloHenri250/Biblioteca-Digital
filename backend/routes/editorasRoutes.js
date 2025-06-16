import express from 'express';
import { listarEditoras, cadastrarEditora, detalhesEditora, editarEditora, excluirEditora } from '../controllers/editorasController.js';

const router = express.Router();

// Rota para listar editoras
router.get('/', listarEditoras);

// Rota para cadastrar editora
router.post('/', cadastrarEditora);

// Rota para buscar detalhes de uma editora
router.get('/:id', detalhesEditora);

// Rota para editar editora
router.put('/:id', editarEditora);

// Rota para excluir editora
router.delete('/:id', excluirEditora);

export default router;
