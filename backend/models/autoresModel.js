import db from '../db.js';

const Autores = {
  // Busca todos os autores
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM autores');
    return rows;
  },

  // Busca um autor por ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM autores WHERE id = ?', [id]);
    return rows[0];
  },

  // Cria um novo autor
  create: async (autor) => {
    const { nome } = autor;
    const [result] = await db.query(
      'INSERT INTO autores (nome) VALUES (?)',
      [nome]
    );
    return result.insertId;
  },

  // Atualiza um autor
  update: async (id, autor) => {
    const { nome } = autor;
    await db.query(
      'UPDATE autores SET nome = ? WHERE id = ?',
      [nome, id]
    );
  },

  // Remove um autor
  delete: async (id) => {
    await db.query('DELETE FROM autores WHERE id = ?', [id]);
  }
};

export default Autores;