import React, { useState } from 'react';
import '../styles/Perfil.css';

function Perfil() {
  const [formData, setFormData] = useState({
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    foto: null,
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, foto: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('Perfil atualizado com sucesso!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="perfil-bg">
      <div className="perfil-card">
        <h2 className="perfil-title">Meu Perfil</h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form className="perfil-form" onSubmit={handleSubmit}>
          <div className="perfil-foto-container">
            <img
              src={formData.foto || '/default-profile.png'}
              alt="Foto de Perfil"
              className="perfil-foto"
            />
            <label htmlFor="foto" className="perfil-foto-label">
              Alterar Foto
              <input
                id="foto"
                type="file"
                accept="image/*"
                className="perfil-foto-input"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="perfil-form-group">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              name="nome"
              className="perfil-input"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>
          <div className="perfil-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="perfil-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="perfil-btn">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
}

export default Perfil;
