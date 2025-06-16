import React, { useState } from 'react';
import '../styles/Favoritos.css';
import { FaSearch, FaHeart, FaBook, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

const favoritosMock = [
  {
    id: 1,
    titulo: 'A Revolução dos Bichos',
    capaUrl: 'https://m.media-amazon.com/images/I/81z5F1QwHGL._AC_UF1000,1000_QL80_.jpg',
    autor: { nome: 'George Orwell' },
    categoria: { nome: 'Ficção Científica' },
    editora: { nome: 'Companhia das Letras' },
  },
  {
    id: 2,
    titulo: 'O Hobbit',
    capaUrl: 'https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg',
    autor: { nome: 'J.R.R. Tolkien' },
    categoria: { nome: 'Fantasia' },
    editora: { nome: 'HarperCollins' },
  },
  {
    id: 3,
    titulo: 'Dom Casmurro',
    capaUrl: 'https://m.media-amazon.com/images/I/81bRlmE4sGL.jpg',
    autor: { nome: 'Machado de Assis' },
    categoria: { nome: 'Literatura Brasileira' },
    editora: { nome: 'Nova Fronteira' },
  },
  {
    id: 4,
    titulo: 'Harry Potter e a Pedra Filosofal',
    capaUrl: 'https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg',
    autor: { nome: 'J.K. Rowling' },
    categoria: { nome: 'Fantasia' },
    editora: { nome: 'Rocco' },
  },
];

function Favoritos() {
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [ordem, setOrdem] = useState('az');
  const [favoritos, setFavoritos] = useState(favoritosMock.map((livro) => livro.id));

  const categorias = [...new Set(favoritosMock.map((livro) => livro.categoria.nome))].sort();
  const autores = [...new Set(favoritosMock.map((livro) => livro.autor.nome))].sort();
  const editoras = [...new Set(favoritosMock.map((livro) => livro.editora.nome))].sort();

  const livrosFiltrados = favoritosMock
    .filter((livro) => {
      const buscaLower = busca.toLowerCase();
      return (
        (!busca ||
          livro.titulo.toLowerCase().includes(buscaLower) ||
          livro.autor.nome.toLowerCase().includes(buscaLower) ||
          livro.categoria.nome.toLowerCase().includes(buscaLower) ||
          livro.editora.nome.toLowerCase().includes(buscaLower)) &&
        (!categoria || livro.categoria.nome === categoria) &&
        (!autor || livro.autor.nome === autor) &&
        (!editora || livro.editora.nome === editora)
      );
    })
    .sort((a, b) =>
      ordem === 'az'
        ? a.titulo.localeCompare(b.titulo, 'pt', { sensitivity: 'base' })
        : b.titulo.localeCompare(a.titulo, 'pt', { sensitivity: 'base' })
    );

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="home-bg-gradient">
      <div className="home-container">
        <div className="home-hero">
          <h1 className="home-title">Meus Favoritos</h1>
          <p className="home-subtitle">
            Explore seus livros favoritos e continue sua jornada de leitura.
          </p>
        </div>
        <div className="home-filtros-card">
          <div className="home-filtro-icongroup">
            <FaSearch className="home-filtro-icon" />
            <input
              type="text"
              className="home-filtro-input"
              placeholder="Buscar por título, autor, editora ou categoria..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <select
            className="home-filtro-input"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas as Categorias</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            className="home-filtro-input"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          >
            <option value="">Todos os Autores</option>
            {autores.map((aut) => (
              <option key={aut} value={aut}>
                {aut}
              </option>
            ))}
          </select>
          <select
            className="home-filtro-input"
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
          >
            <option value="">Todas as Editoras</option>
            {editoras.map((edi) => (
              <option key={edi} value={edi}>
                {edi}
              </option>
            ))}
          </select>
          <button
            className="home-filtro-ordem-btn"
            onClick={() => setOrdem(ordem === 'az' ? 'za' : 'az')}
            title={ordem === 'az' ? 'Ordem A-Z' : 'Ordem Z-A'}
          >
            {ordem === 'az' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
            {ordem === 'az' ? 'A-Z' : 'Z-A'}
          </button>
        </div>
        <div className="home-books-grid">
          {livrosFiltrados.map((livro) => (
            <div key={livro.id} className="home-livro-card">
              <div className="home-livro-capa-area">
                <img src={livro.capaUrl} alt={livro.titulo} className="home-livro-capa-img" />
                <button
                  className={`home-livro-fav-btn ${favoritos.includes(livro.id) ? 'ativo' : ''}`}
                  onClick={() => toggleFavorito(livro.id)}
                >
                  <FaHeart />
                </button>
              </div>
              <div className="home-livro-card-body">
                <h3 className="home-livro-titulo">{livro.titulo}</h3>
                <p className="home-livro-info">{livro.autor.nome}</p>
                <p className="home-livro-info">Editora: {livro.editora.nome}</p>
                <p className="home-livro-info">Categoria: {livro.categoria.nome}</p>
                <button className="home-livro-btn">
                  <FaBook /> Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favoritos;
