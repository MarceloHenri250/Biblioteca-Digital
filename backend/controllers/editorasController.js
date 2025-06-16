import Editoras from '../models/editorasModel.js';

export const listarEditoras = async (req, res) => {
  try {
    const editoras = await Editoras.getAll();
    res.status(200).json(editoras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao listar editoras.' });
  }
};

export const cadastrarEditora = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ mensagem: 'O nome da editora é obrigatório.' });
    }
    const editoraId = await Editoras.create({ nome });
    const novaEditora = await Editoras.getById(editoraId); // Retorna a editora criada
    res.status(201).json(novaEditora);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar editora.' });
  }
};

export const detalhesEditora = async (req, res) => {
  try {
    const { id } = req.params;
    const editora = await Editoras.getById(id);
    if (!editora) {
      return res.status(404).json({ mensagem: 'Editora não encontrada.' });
    }
    res.status(200).json(editora);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar detalhes da editora.' });
  }
};

export const editarEditora = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ mensagem: 'O nome da editora é obrigatório.' });
    }
    await Editoras.update(id, { nome });
    res.status(200).json({ mensagem: 'Editora atualizada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao editar editora.' });
  }
};

export const excluirEditora = async (req, res) => {
  try {
    const { id } = req.params;
    await Editoras.delete(id);
    res.status(200).json({ mensagem: 'Editora excluída com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao excluir editora.' });
  }
};
