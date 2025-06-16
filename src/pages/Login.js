import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Login.css';
import logo from '../assets/logo_BookSphere.jpeg'; // Importar a logo
import { login } from '../services/api';

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      console.log("Iniciando requisição de login...");
      const response = await login({ email, senha });
      setMensagem(response.mensagem);
      console.log("Resposta recebida da API:", response.data);
      const { token, usuario } = response.data;

      // Salvar o token no localStorage ou sessionStorage
      if (lembrar) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      // Redirecionar para a página inicial ou dashboard
      alert(`Bem-vindo, ${usuario.nome}!`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data || error);
      setErro(error.response?.data?.error || "Erro ao fazer login. Tente novamente.");
      setMensagem(error.mensagem || 'Erro ao realizar login.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="BookSphere Logo" className="login-logo" />
        <h2 className="login-title">BookSphere</h2>
        <p className="login-subtitle">Acesse sua conta</p>
        {erro && <div className="login-error">{erro}</div>}
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <div className="password-container">
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                className="form-input"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete="current-password"
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
          <div className="form-check">
            <input
              id="lembrar"
              type="checkbox"
              checked={lembrar}
              onChange={(e) => setLembrar(e.target.checked)}
            />
            <label htmlFor="lembrar">Lembrar-me</label>
          </div>
          <button type="submit" className="form-btn">Entrar</button>
        </form>
        <div className="login-links">
          <p>
            Não tem conta? <Link to="/registrar">Cadastre-se</Link>
          </p>
          <p>
            <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
