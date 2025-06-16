import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Função para cadastrar um usuário
export const cadastrarUsuario = async (dadosUsuario) => {
  try {
    const response = await api.post('/usuarios/cadastro', dadosUsuario);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Função para recuperação de senha
export const recuperarSenha = async (email) => {
  try {
    const response = await api.post('/usuarios/recuperar-senha', { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Função para validar token
export const validarToken = async (token) => {
  try {
    const response = await api.post('/usuarios/validar-token', { token });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Função para redefinir senha
export const redefinirSenha = async ({ token, novaSenha }) => {
  try {
    const response = await api.post('/usuarios/redefinir-senha', { token, novaSenha });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Função para login
export const login = async (credenciais) => {
  try {
    const response = await api.post('/usuarios/login', credenciais);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Funções para gerenciar autores

// Listar autores
export const listarAutores = async () => {
  try {
    const response = await api.get('/autores');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Cadastrar autor
export const cadastrarAutor = async (dadosAutor) => {
  try {
    const response = await api.post('/autores', dadosAutor);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Detalhes do autor
export const detalhesAutor = async (id) => {
  try {
    const response = await api.get(`/autores/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Editar autor
export const editarAutor = async (id, dadosAutor) => {
  try {
    const response = await api.put(`/autores/${id}`, dadosAutor);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Excluir autor
export const excluirAutor = async (id) => {
  try {
    const response = await api.delete(`/autores/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Funções para gerenciar editoras

// Listar editoras
export const listarEditoras = async () => {
  try {
    const response = await api.get('/editoras'); // Certifique-se de que o endpoint está correto
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Cadastrar editora
export const cadastrarEditora = async (dadosEditora) => {
  try {
    const response = await api.post('/editoras', dadosEditora);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Detalhes da editora
export const detalhesEditora = async (id) => {
  try {
    const response = await api.get(`/editoras/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Editar editora
export const editarEditora = async (id, dadosEditora) => {
  try {
    const response = await api.put(`/editoras/${id}`, dadosEditora);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Excluir editora
export const excluirEditora = async (id) => {
  try {
    const response = await api.delete(`/editoras/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Funções para gerenciar categorias

// Listar categorias
export const listarCategorias = async () => {
  try {
    const response = await api.get('/categorias'); // Certifique-se de que o endpoint está correto
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Cadastrar categoria
export const cadastrarCategoria = async (dadosCategoria) => {
  try {
    const response = await api.post('/categorias', dadosCategoria);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Detalhes da categoria
export const detalhesCategoria = async (id) => {
  try {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Editar categoria
export const editarCategoria = async (id, dadosCategoria) => {
  try {
    const response = await api.put(`/categorias/${id}`, dadosCategoria);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Excluir categoria
export const excluirCategoria = async (id) => {
  try {
    const response = await api.delete(`/categorias/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Funções para gerenciar livros

// Listar livros
export const listarLivros = async () => {
  try {
    const response = await api.get('/livros');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Cadastrar livro
export const cadastrarLivro = async (dadosLivro) => {
  try {
    const response = await api.post('/livros', dadosLivro);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Detalhes do livro
export const detalhesLivro = async (id) => {
  try {
    const response = await api.get(`/livros/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Editar livro
export const editarLivro = async (id, dadosLivro) => {
  try {
    const response = await api.put(`/livros/${id}`, dadosLivro);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

// Excluir livro
export const excluirLivro = async (id) => {
  try {
    const response = await api.delete(`/livros/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { mensagem: 'Erro ao conectar com o servidor.' };
  }
};

export default api;