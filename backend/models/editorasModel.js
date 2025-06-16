import db from '../db.js';

const Editoras = {
  // Busca todas as editoras
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM editoras');
    return rows;
  },

  // Busca uma editora por ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM editoras WHERE id = ?', [id]);
    return rows[0];
  },

  // Cria uma nova editora
  create: async (editora) => {
    const { nome } = editora;
    const [result] = await db.query(
      'INSERT INTO editoras (nome) VALUES (?)',
      [nome]
    );
    return result.insertId;
  },

  // Atualiza uma editora
  update: async (id, editora) => {
    const { nome } = editora;
    await db.query(
      'UPDATE editoras SET nome = ? WHERE id = ?',
      [nome, id]
    );
  },

  // Remove uma editora
  delete: async (id) => {
    await db.query('DELETE FROM editoras WHERE id = ?', [id]);
  }
};

export default Editoras;