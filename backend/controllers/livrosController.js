import Livros from '../models/livrosModel.js';

export const listarLivros = async (req, res) => {
  try {
    const livros = await Livros.getAll();
    res.status(200).json(livros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao listar livros.' });
  }
};

export const cadastrarLivro = async (req, res) => {
  try {
    const { titulo, autorId, editoraId, categoriaId, anoPublicacao, paginas, sinopse, quantidadeDisponivel, capaUrl, isbn } = req.body;
    if (!titulo || !autorId || !editoraId || !categoriaId) {
      return res.status(400).json({ mensagem: 'Título, autor, editora e categoria são obrigatórios.' });
    }
    const livroId = await Livros.create({ titulo, autorId, editoraId, categoriaId, anoPublicacao, paginas, sinopse, quantidadeDisponivel, capaUrl, isbn });
    const novoLivro = await Livros.getById(livroId);
    res.status(201).json(novoLivro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar livro.' });
  }
};

export const detalhesLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await Livros.getById(id);
    if (!livro) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }
    res.status(200).json(livro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar detalhes do livro.' });
  }
};

export const editarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autorId, editoraId, categoriaId, anoPublicacao, paginas, sinopse, quantidadeDisponivel, capaUrl, isbn } = req.body;

    // Verificar se todos os campos obrigatórios estão presentes
    if (!titulo || !autorId || !editoraId || !categoriaId) {
      return res.status(400).json({ mensagem: 'Campos obrigatórios estão faltando.' });
    }

    const livroExistente = await Livros.getById(id);
    if (!livroExistente) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }

    await Livros.update(id, { titulo, autorId, editoraId, categoriaId, anoPublicacao, paginas, sinopse, quantidadeDisponivel, capaUrl, isbn });
    const livroAtualizado = await Livros.getById(id);

    res.status(200).json(livroAtualizado);
  } catch (error) {
    console.error('Erro ao editar livro:', error);
    res.status(500).json({ mensagem: 'Erro ao editar livro.' });
  }
};

export const excluirLivro = async (req, res) => {
  try {
    const { id } = req.params;

    const livroExistente = await Livros.getById(id);
    if (!livroExistente) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }

    await Livros.delete(id);
    res.status(200).json({ mensagem: 'Livro excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao excluir livro.' });
  }
};
