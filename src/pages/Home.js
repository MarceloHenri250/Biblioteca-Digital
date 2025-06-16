import React, { useState } from 'react';
import '../styles/Home.css';
import { FaSearch, FaHeart, FaBook, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';

const categoriasMock = [
  { id: 1, nome: 'Ficção Científica' },
  { id: 2, nome: 'Fantasia' },
  { id: 3, nome: 'Suspense' },
  { id: 4, nome: 'Drama' },
  { id: 5, nome: 'Romance' },
];

const editorasMock = [
  { id: 1, nome: 'Agir' },
  { id: 2, nome: 'Rocco' },
  { id: 3, nome: 'Arqueiro' },
  { id: 4, nome: 'Companhia das Letras' },
  { id: 5, nome: 'Martin Claret' },
];

const autoresMock = [
  { id: 1, nome: 'George Orwell' },
  { id: 2, nome: 'J.R.R. Tolkien' },
  { id: 3, nome: 'Gabriel García Márquez' },
  { id: 4, nome: 'Antoine de Saint-Exupéry' },
  { id: 5, nome: 'J.K. Rowling' },
];

const livrosMock = [
  {
    id: 1,
    titulo: 'A Revolução dos Bichos',
    capaUrl: 'https://m.media-amazon.com/images/I/81z5F1QwHGL._AC_UF1000,1000_QL80_.jpg',
    autor: { nome: 'George Orwell' },
  },
  {
    id: 2,
    titulo: 'O Hobbit',
    capaUrl: 'https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg',
    autor: { nome: 'J.R.R. Tolkien' },
  },
  {
    id: 3,
    titulo: '1984',
    capaUrl: 'https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg',
    autor: { nome: 'George Orwell' },
  },
  {
    id: 4,
    titulo: 'Cem Anos de Solidão',
    capaUrl: 'https://m.media-amazon.com/images/I/81eA+eA0QwL.jpg',
    autor: { nome: 'Gabriel García Márquez' },
  },
  {
    id: 5,
    titulo: 'O Pequeno Príncipe',
    capaUrl: 'https://m.media-amazon.com/images/I/81AFhc5FJTL.jpg',
    autor: { nome: 'Antoine de Saint-Exupéry' },
    categoria: { nome: 'Ficção Científica' },
    editora: { nome: 'Agir' }
  },
  {
    id: 6,
    titulo: 'Harry Potter e a Pedra Filosofal',
    capaUrl: 'https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg',
    autor: { nome: 'J.K. Rowling' },
    categoria: { nome: 'Fantasia' },
    editora: { nome: 'Rocco' }
  },
  {
    id: 7,
    titulo: 'O Código Da Vinci',
    capaUrl: 'https://m.media-amazon.com/images/I/81QZt1U6QSL.jpg',
    autor: { nome: 'Dan Brown' },
    categoria: { nome: 'Suspense' },
    editora: { nome: 'Arqueiro' }
  },
  {
    id: 8,
    titulo: 'A Menina que Roubava Livros',
    capaUrl: 'https://m.media-amazon.com/images/I/81eA+eA0QwL.jpg',
    autor: { nome: 'Markus Zusak' },
    categoria: { nome: 'Drama' },
    editora: { nome: 'Companhia das Letras' }
  },
  {
    id: 9,
    titulo: 'O Alquimista',
    capaUrl: 'https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg',
    autor: { nome: 'Paulo Coelho' },
    categoria: { nome: 'Ficção Científica' },
    editora: { nome: 'Agir' }
  },
  {
    id: 10,
    titulo: 'O Morro dos Ventos Uivantes',
    capaUrl: 'https://m.media-amazon.com/images/I/81dQwQlmAXL.jpg',
    autor: { nome: 'Emily Brontë' },
    categoria: { nome: 'Romance' },
    editora: { nome: 'Martin Claret' }
  },
  {
    id: 11,
    titulo: 'A Metamorfose',
    capaUrl: 'https://m.media-amazon.com/images/I/81p+xe8cbnL.jpg',
    autor: { nome: 'Franz Kafka' },
    categoria: { nome: 'Ficção Científica' },
    editora: { nome: 'Nova Fronteira' }
  },
  {
    id: 12,
    titulo: 'O Nome do Vento',
    capaUrl: 'https://m.media-amazon.com/images/I/81eA+eA0QwL.jpg',
    autor: { nome: 'Patrick Rothfuss' },
    categoria: { nome: 'Fantasia' },
    editora: { nome: 'HarperCollins' }
  },
];

function Home() {
  const [busca, setBusca] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [editoraId, setEditoraId] = useState('');
  const [autorId, setAutorId] = useState('');
  const [ordem, setOrdem] = useState('az');
  const [favoritos, setFavoritos] = useState([]);

  const livrosFiltrados = livrosMock
    .filter((livro) => {
      const buscaLower = busca.toLowerCase();
      return (
        (!busca || livro.titulo.toLowerCase().includes(buscaLower)) &&
        (!categoriaId || livro.categoria?.nome === categoriasMock.find(c => c.id === Number(categoriaId))?.nome) &&
        (!editoraId || livro.editora?.nome === editorasMock.find(e => e.id === Number(editoraId))?.nome) &&
        (!autorId || livro.autor?.nome === autoresMock.find(a => a.id === Number(autorId))?.nome)
      );
    })
    .sort((a, b) => (ordem === 'az' ? a.titulo.localeCompare(b.titulo) : b.titulo.localeCompare(a.titulo)));

  console.log("Livros filtrados:", livrosFiltrados); // Log para verificar os dados filtrados

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="home-bg-gradient">
      <div className="home-container">
        <div className="home-hero">
          <h1 className="home-title">BookSphere</h1>
          <p className="home-subtitle">
            Explore, descubra e favorite livros incríveis em nossa biblioteca digital.
          </p>
        </div>
        <div className="home-filtros-card">
          <div className="home-filtro-icongroup">
            <FaSearch className="home-filtro-icon" />
            <input
              type="text"
              className="home-filtro-input"
              placeholder="Buscar por título..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <select
            className="home-filtro-input"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="">Todas as Categorias</option>
            {[...categoriasMock].sort((a, b) => a.nome.localeCompare(b.nome)).map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
          <select
            className="home-filtro-input"
            value={editoraId}
            onChange={(e) => setEditoraId(e.target.value)}
          >
            <option value="">Todas as Editoras</option>
            {[...editorasMock].sort((a, b) => a.nome.localeCompare(b.nome)).map((editora) => (
              <option key={editora.id} value={editora.id}>
                {editora.nome}
              </option>
            ))}
          </select>
          <select
            className="home-filtro-input"
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
          >
            <option value="">Todos os Autores</option>
            {[...autoresMock].sort((a, b) => a.nome.localeCompare(b.nome)).map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.nome}
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
                <p className="home-livro-info">Editora: {livro.editora?.nome || 'N/A'}</p>
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

export default Home;
