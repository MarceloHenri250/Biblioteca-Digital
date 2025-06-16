import React, { useState } from 'react';
import '../styles/RecuperarSenha.css';
import logo from '../assets/logo_BookSphere.jpeg'; // Importar a logo
import { recuperarSenha, validarToken, redefinirSenha } from '../services/api';

const RecuperarSenha = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [etapa, setEtapa] = useState(1); // 1: Solicitar email, 2: Validar token, 3: Redefinir senha

  const handleRecuperarSenha = async (e) => {
    e.preventDefault();
    try {
      const response = await recuperarSenha(email);
      setMensagem(response.mensagem);
      setToken(response.token); // Exibir o token na tela
      setEtapa(2);
    } catch (error) {
      setMensagem(error.mensagem || 'Erro ao solicitar recuperação de senha.');
    }
  };

  const handleValidarToken = async (e) => {
    e.preventDefault();
    try {
      const response = await validarToken(token);
      setMensagem(response.mensagem);
      setEtapa(3);
    } catch (error) {
      setMensagem(error.mensagem || 'Token inválido ou expirado.');
    }
  };

  const handleRedefinirSenha = async (e) => {
    e.preventDefault();
    if (novaSenha !== confirmarSenha) {
      setMensagem('As senhas não coincidem.');
      return;
    }
    try {
      const response = await redefinirSenha({ token, novaSenha });
      setMensagem(response.mensagem);
      setEtapa(1);
    } catch (error) {
      setMensagem(error.mensagem || 'Erro ao redefinir senha.');
    }
  };

  return (
    <div className="recuperar-container">
      <div className="recuperar-card">
        <img src={logo} alt="BookSphere Logo" className="recuperar-logo" />
        <h2 className="recuperar-title">Recuperar Senha</h2>
        {mensagem && <div className="recuperar-message">{mensagem}</div>}
        {etapa === 1 && (
          <form className="recuperar-form" onSubmit={handleRecuperarSenha}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Digite seu email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="form-btn">Enviar</button>
          </form>
        )}
        {etapa === 2 && (
          <form className="recuperar-form" onSubmit={handleValidarToken}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Digite o token"
                className="form-input"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="form-btn">Validar Token</button>
          </form>
        )}
        {etapa === 3 && (
          <form className="recuperar-form" onSubmit={handleRedefinirSenha}>
            <div className="form-group">
              <div className="password-container">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Nova senha"
                  className="form-input"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  required
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
                  placeholder="Confirmar nova senha"
                  className="form-input"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
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
            <button type="submit" className="form-btn">Redefinir Senha</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecuperarSenha;



