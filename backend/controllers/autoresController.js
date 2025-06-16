import Autores from '../models/autoresModel.js';

export const listarAutores = async (req, res) => {
  try {
    const autores = await Autores.getAll();
    res.status(200).json(autores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao listar autores.' });
  }
};

export const cadastrarAutor = async (req, res) => {
  try {
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ mensagem: 'O nome do autor é obrigatório.' });
    }

    // Verifica se o autor já existe
    const autoresExistentes = await Autores.getAll();
    const autorDuplicado = autoresExistentes.find(
      (autor) => autor.nome.toLowerCase() === nome.toLowerCase()
    );
    if (autorDuplicado) {
      return res.status(400).json({ mensagem: 'Autor já cadastrado.' });
    }

    const autorId = await Autores.create({ nome });
    res.status(201).json({ mensagem: 'Autor cadastrado com sucesso.', id: autorId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar autor.' });
  }
};

export const detalhesAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const autor = await Autores.getById(id);
    if (!autor) {
      return res.status(404).json({ mensagem: 'Autor não encontrado.' });
    }
    res.status(200).json(autor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar detalhes do autor.' });
  }
};

export const editarAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    if (!nome) {
      return res.status(400).json({ mensagem: 'O nome do autor é obrigatório.' });
    }
    await Autores.update(id, { nome });
    res.status(200).json({ mensagem: 'Autor atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao editar autor.' });
  }
};

export const excluirAutor = async (req, res) => {
  try {
    const { id } = req.params;
    await Autores.delete(id);
    res.status(200).json({ mensagem: 'Autor excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao excluir autor.' });
  }
};