import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Registrar.css';
import logo from '../assets/logo_BookSphere.jpeg'; // Importar a logo
import { cadastrarUsuario } from '../services/api';

function Registrar() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    fotoPerfil: '',
    tipoPerfil: 'leitor',
  });

  const [error, setError] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, email, senha, confirmPassword } = formData;

    console.log('Tentativa de cadastro iniciada');

    if (!nome || !email || !senha || !confirmPassword) {
      console.log('Erro: Todos os campos são obrigatórios');
      setError('Todos os campos são obrigatórios.');
      return;
    }

    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!senhaRegex.test(senha)) {
      console.log('Erro: Senha não atende aos requisitos');
      setError('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número.');
      return;
    }

    if (senha !== confirmPassword) {
      console.log('Erro: As senhas não coincidem');
      setError('As senhas não coincidem.');
      return;
    }

    try {
      console.log('Enviando requisição para o backend...');
      setError('');
      const response = await cadastrarUsuario(formData);
      setMensagem(response.mensagem);
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error.response?.data || error);
      setError('Erro ao cadastrar. Tente novamente.');
      setMensagem(error.mensagem || 'Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className="registrar-container">
      <div className="registrar-card">
        <img src={logo} alt="BookSphere Logo" className="registrar-logo" /> {/* Adicionar a logo */}
        <h2 className="registrar-title">BookSphere</h2>
        <p className="registrar-subtitle">Crie sua conta</p>
        {error && <div className="registrar-error">{error}</div>}
        <form className="registrar-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="nome"
              className="form-input"
              placeholder="Nome de usuário"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <div className="password-container">
              <input
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                className="form-input"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                <i className={`bi ${mostrarSenha ? "bi-eye" : "bi-eye-slash"}`}></i>
              </button>
            </div>
          </div>
          <div className="form-group">
            <div className="password-container">
              <input
                type={mostrarSenha ? "text" : "password"}
                name="confirmPassword"
                className="form-input"
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                <i className={`bi ${mostrarSenha ? "bi-eye" : "bi-eye-slash"}`}></i>
              </button>
            </div>
          </div>
          <button type="submit" className="form-btn">Cadastrar</button>
        </form>
        {mensagem && <p>{mensagem}</p>}
        <div className="registrar-links">
          Já tem uma conta? <a href="/login">Faça login</a>
        </div>
      </div>
    </div>
  );
}

export default Registrar;




