import db from '../db.js';

const Favoritos = {
  // Busca todos os favoritos
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM favoritos');
    return rows;
  },

  // Busca um favorito por ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM favoritos WHERE id = ?', [id]);
    return rows[0];
  },

  // Adiciona um novo favorito
  create: async (favorito) => {
    const { usuarioId, livroId } = favorito;
    const [result] = await db.query(
      'INSERT INTO favoritos (usuarioId, livroId) VALUES (?, ?)',
      [usuarioId, livroId]
    );
    return result.insertId;
  },

  // Remove um favorito
  delete: async (id) => {
    await db.query('DELETE FROM favoritos WHERE id = ?', [id]);
  }
};

export default Favoritos;