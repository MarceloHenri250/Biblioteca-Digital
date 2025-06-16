import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './CadastrarLivro.css';

const CadastrarLivro = () => {
  const [titulo, setTitulo] = useState('');
  const [autorId, setAutorId] = useState('');
  const [editoraId, setEditoraId] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [paginas, setPaginas] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState('');
  const [capaUrl, setCapaUrl] = useState('');
  const [isbn, setIsbn] = useState('');

  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const autoresResponse = await api.get('/autores');
        const editorasResponse = await api.get('/editoras');
        const categoriasResponse = await api.get('/categorias');

        setAutores(autoresResponse.data);
        setEditoras(editorasResponse.data);
        setCategorias(categoriasResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoLivro = {
      titulo,
      autorId,
      editoraId,
      categoriaId,
      anoPublicacao,
      paginas,
      sinopse,
      quantidadeDisponivel,
      capaUrl,
      isbn,
    };

    try {
      await api.post('/livros', novoLivro);
      alert('Livro cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error);
      alert('Erro ao cadastrar livro.');
    }
  };

  return (
    <div className="cadastrar-livro">
      <h2>Cadastrar Livro</h2>
      <form onSubmit={handleSubmit} className="horizontal-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <select
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
            required
          >
            <option value="">Selecione o autor</option>
            {autores.map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <select
            value={editoraId}
            onChange={(e) => setEditoraId(e.target.value)}
            required
          >
            <option value="">Selecione a editora</option>
            {editoras.map((editora) => (
              <option key={editora.id} value={editora.id}>
                {editora.nome}
              </option>
            ))}
          </select>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
          >
            <option value="">Selecione a categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <input
            type="number"
            placeholder="Ano de Publicação"
            value={anoPublicacao}
            onChange={(e) => setAnoPublicacao(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Número de Páginas"
            value={paginas}
            onChange={(e) => setPaginas(e.target.value)}
            required
          />
        </div>
        <textarea
          placeholder="Sinopse"
          value={sinopse}
          onChange={(e) => setSinopse(e.target.value)}
          required
        ></textarea>
        <div className="form-row">
          <input
            type="number"
            placeholder="Quantidade Disponível"
            value={quantidadeDisponivel}
            onChange={(e) => setQuantidadeDisponivel(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="URL da Capa"
            value={capaUrl}
            onChange={(e) => setCapaUrl(e.target.value)}
            required
          />
        </div>
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarLivro;
