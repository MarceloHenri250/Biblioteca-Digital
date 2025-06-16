import db from '../db.js';

const Livros = {
  // Busca todos os livros
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT livros.id, livros.titulo, livros.anoPublicacao, livros.paginas, livros.sinopse, livros.quantidadeDisponivel, livros.capaUrl, livros.isbn,
             autores.nome AS autorNome, editoras.nome AS editoraNome, categorias.nome AS categoriaNome
      FROM livros
      LEFT JOIN autores ON livros.autorId = autores.id
      LEFT JOIN editoras ON livros.editoraId = editoras.id
      LEFT JOIN categorias ON livros.categoriaId = categorias.id
    `);
    return rows;
  },

  // Busca um livro por ID
  getById: async (id) => {
    const [rows] = await db.query(`
      SELECT livros.id, livros.titulo, livros.anoPublicacao, livros.paginas, livros.sinopse, livros.quantidadeDisponivel, livros.capaUrl, livros.isbn,
             autores.nome AS autorNome, editoras.nome AS editoraNome, categorias.nome AS categoriaNome
      FROM livros
      LEFT JOIN autores ON livros.autorId = autores.id
      LEFT JOIN editoras ON livros.editoraId = editoras.id
      LEFT JOIN categorias ON livros.categoriaId = categorias.id
      WHERE livros.id = ?
    `, [id]);
    return rows[0];
  },

  // Cria um novo livro
  create: async (livro) => {
    const { titulo, autorId, editoraId, categoriaId, anoPublicacao, paginas, sinopse, quantidadeDisponivel, capaUrl, isbn } = livro;
    const [result] = await db.query(
      'INSERT INTO livros (titulo, autorId, editoraId, categoriaId, anoPublicacao, paginas, sinopse, quantidadeDisponivel, capaUrl, isbn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [titulo, autorId, editoraId, categoriaId, anoPublicacao, paginas, sinopse, quantidadeDisponivel, capaUrl, isbn]
    );
    return result.insertId;
  },

  // Atualiza um livro
  update: async (id, livro) => {
    const { titulo, autorId, editoraId, categoriaId, anoPublicacao, paginas, sinopse, quantidadeDisponivel, capaUrl, isbn } = livro;
    await db.query(
      'UPDATE livros SET titulo = ?, autorId = ?, editoraId = ?, categoriaId = ?, anoPublicacao = ?, paginas = ?, sinopse = ?, quantidadeDisponivel = ?, capaUrl = ?, isbn = ? WHERE id = ?',
      [titulo, autorId, editoraId, categoriaId, anoPublicacao, paginas, sinopse, quantidadeDisponivel, capaUrl, isbn, id]
    );
  },

  // Remove um livro
  delete: async (id) => {
    await db.query('DELETE FROM livros WHERE id = ?', [id]);
  }
};

export default Livros;