import Categorias from '../models/categoriasModel.js';

export const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categorias.getAll();
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao listar categorias.' });
  }
};

export const cadastrarCategoria = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ mensagem: 'O nome da categoria é obrigatório.' });
    }
    const categoriaId = await Categorias.create({ nome });
    const novaCategoria = await Categorias.getById(categoriaId); // Retorna a categoria criada
    res.status(201).json(novaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar categoria.' });
  }
};

export const detalhesCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categorias.getById(id);
    if (!categoria) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
    }
    res.status(200).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar detalhes da categoria.' });
  }
};

export const editarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ mensagem: 'O nome da categoria é obrigatório.' });
    }
    await Categorias.update(id, { nome });
    res.status(200).json({ mensagem: 'Categoria atualizada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao editar categoria.' });
  }
};

export const excluirCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await Categorias.delete(id);
    res.status(200).json({ mensagem: 'Categoria excluída com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao excluir categoria.' });
  }
};
