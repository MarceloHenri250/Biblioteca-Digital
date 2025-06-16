import db from '../db.js';

const Categorias = {
  // Busca todas as categorias
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM categorias');
    return rows;
  },

  // Busca uma categoria por ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0];
  },

  // Cria uma nova categoria
  create: async (categoria) => {
    const { nome } = categoria;
    const [result] = await db.query(
      'INSERT INTO categorias (nome) VALUES (?)',
      [nome]
    );
    return result.insertId;
  },

  // Atualiza uma categoria
  update: async (id, categoria) => {
    const { nome } = categoria;
    await db.query(
      'UPDATE categorias SET nome = ? WHERE id = ?',
      [nome, id]
    );
  },

  // Remove uma categoria
  delete: async (id) => {
    await db.query('DELETE FROM categorias WHERE id = ?', [id]);
  }
};

export default Categorias;