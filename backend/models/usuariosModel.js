import db from '../db.js';

const Usuarios = {
  // Busca todos os usuários
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM usuarios');
    return rows;
  },

  // Busca um usuário por ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  },

  // Cria um novo usuário
  create: async (usuario) => {
    const { nome, email, senha, fotoPerfil, tipoPerfil } = usuario;
    const [result] = await db.query(
      'INSERT INTO usuarios (nome, email, senha, fotoPerfil, tipoPerfil) VALUES (?, ?, ?, ?, ?)',
      [nome, email, senha, fotoPerfil, tipoPerfil]
    );
    return result.insertId;
  },

  // Atualiza um usuário
  update: async (id, usuario) => {
    const fields = Object.keys(usuario).map((key) => `${key} = ?`).join(', ');
    const values = Object.values(usuario);
    await db.query(`UPDATE usuarios SET ${fields} WHERE id = ?`, [...values, id]);
  },

  // Remove um usuário
  delete: async (id) => {
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
  }
};

export default Usuarios;