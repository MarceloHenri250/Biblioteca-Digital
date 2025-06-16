import React, { useState, useEffect } from "react";
import {
  FaPlus, FaEdit, FaEye, FaTrash, FaExclamationTriangle, FaTimes,
  FaSearch, FaChevronLeft, FaChevronRight, FaSortAlphaDown, FaSortAlphaUp
} from "react-icons/fa";
import { listarLivros, cadastrarLivro, editarLivro, excluirLivro, listarAutores, listarEditoras, listarCategorias } from "../services/api";
import '../styles/Livros.css';

const PAGE_SIZE_OPTIONS = [10, 15, 20, 25, 30];

function Livros() {
  const [livros, setLivros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [ordem, setOrdem] = useState("az");
  const [pageSize, setPageSize] = useState(10);
  const [novoLivro, setNovoLivro] = useState({
    titulo: "",
    autorId: "",
    editoraId: "",
    categoriaId: "",
    anoPublicacao: "",
    paginas: "",
    sinopse: "",
    quantidadeDisponivel: "",
    capaUrl: "",
    isbn: ""
  });
  const [livroEditar, setLivroEditar] = useState(null);
  const [livroExcluir, setLivroExcluir] = useState(null);
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [livroDetalhes, setLivroDetalhes] = useState(null);

  const carregarLivros = async () => {
    try {
      const data = await listarLivros();
      setLivros(data);
    } catch (error) {
      setMensagemErro("Erro ao carregar livros.");
    }
  };

  const carregarAutores = async () => {
    try {
      const data = await listarAutores();
      setAutores(data);
    } catch (error) {
      setMensagemErro("Erro ao carregar autores.");
    }
  };

  const carregarEditoras = async () => {
    try {
      const data = await listarEditoras();
      setEditoras(data);
    } catch (error) {
      setMensagemErro("Erro ao carregar editoras.");
    }
  };

  const carregarCategorias = async () => {
    try {
      const data = await listarCategorias();
      setCategorias(data);
    } catch (error) {
      setMensagemErro("Erro ao carregar categorias.");
    }
  };

  useEffect(() => {
    carregarLivros();
    carregarAutores();
    carregarEditoras();
    carregarCategorias();
  }, []);

  const handleCadastrarLivro = async () => {
    const {
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
    } = novoLivro;

    if (!titulo || !autorId || !editoraId || !categoriaId) {
      setMensagemErro("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await cadastrarLivro({
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
      });
      setShowCadastroModal(false);
      setNovoLivro({
        titulo: "",
        autorId: "",
        editoraId: "",
        categoriaId: "",
        anoPublicacao: "",
        paginas: "",
        sinopse: "",
        quantidadeDisponivel: "",
        capaUrl: "",
        isbn: "",
      });
      carregarLivros();
    } catch (error) {
      setMensagemErro("Erro ao cadastrar livro.");
    }
  };

  const handleEditarLivro = async () => {
    const {
      id,
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
    } = livroEditar;

    if (!titulo || !autorId || !editoraId || !categoriaId) {
      setMensagemErro("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await editarLivro(id, {
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
      });
      setLivroEditar(null);
      carregarLivros(); // Recarregar a lista de livros após a edição
    } catch (error) {
      setMensagemErro("Erro ao editar livro.");
    }
  };

  const handleExcluirLivro = async (id) => {
    try {
      await excluirLivro(id);
      setLivros((prevLivros) => prevLivros.filter((l) => l.id !== id));
      setLivroExcluir(null);
    } catch (error) {
      setMensagemErro("Erro ao excluir livro.");
    }
  };

  // Filtra livros pelo campo de busca
  let livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  // Ordenação alfabética
  livrosFiltrados = livrosFiltrados.sort((a, b) => {
    if (ordem === "az") {
      return a.titulo.localeCompare(b.titulo, "pt", { sensitivity: "base" });
    } else {
      return b.titulo.localeCompare(a.titulo, "pt", { sensitivity: "base" });
    }
  });

  // Paginação
  const totalPaginas = Math.ceil(livrosFiltrados.length / pageSize);
  const livrosPagina = livrosFiltrados.slice(
    (pagina - 1) * pageSize,
    pagina * pageSize
  );

  const handleBuscaChange = (e) => {
    setBusca(e.target.value);
    setPagina(1);
  };

  const handleOrdemChange = () => {
    setOrdem((o) => (o === "az" ? "za" : "az"));
    setPagina(1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPagina(1);
  };

  return (
    <div className="livros-bg">
      <h2 className="livros-title">Livros</h2>
      {mensagemErro && <div className="livros-erro">{mensagemErro}</div>}
      <div className="livros-filtros-container">
        <div className="livros-filtro-item">
          <div className="livros-busca-container">
            <FaSearch className="livros-busca-icon" />
            <input
              type="text"
              className="livros-busca-input"
              placeholder="Buscar livro..."
              value={busca}
              onChange={handleBuscaChange}
            />
          </div>
        </div>
        <div className="livros-filtro-item">
          <button
            className="livros-ordem-btn"
            onClick={handleOrdemChange}
            title={ordem === "az" ? "Ordem A-Z" : "Ordem Z-A"}
          >
            {ordem === "az" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
            {ordem === "az" ? "A-Z" : "Z-A"}
          </button>
        </div>
        <div className="livros-filtro-item">
          <select
            className="livros-page-size-select"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            {PAGE_SIZE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt} por página
              </option>
            ))}
          </select>
        </div>
        <div className="livros-filtro-item">
          <button
            className="livros-btn-primary"
            onClick={() => setShowCadastroModal(true)}
          >
            <FaPlus /> Novo Livro
          </button>
        </div>
      </div>
      <table className="livros-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Editora</th>
            <th>Categoria</th>
            <th>Disponível</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", color: "#888" }}>
                Nenhum livro encontrado.
              </td>
            </tr>
          ) : (
            livros.map((livro) => (
              <tr key={livro.id}>
                <td>{livro.titulo}</td>
                <td>{livro.autorNome || "Desconhecido"}</td>
                <td>{livro.editoraNome || "Desconhecida"}</td>
                <td>{livro.categoriaNome || "Desconhecida"}</td>
                <td>
                  <span
                    className={`livros-disponivel ${livro.quantidadeDisponivel > 0 ? "sim" : "nao"}`}
                  >
                    {livro.quantidadeDisponivel > 0 ? "Sim" : "Não"}
                  </span>
                </td>
                <td>{livro.quantidadeDisponivel}</td>
                <td>
                  <div className="livros-acoes-container">
                    <button
                      className="livros-btn-warning"
                      onClick={() => setLivroEditar(livro)}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button
                      className="livros-btn-info"
                      onClick={() => setLivroDetalhes(livro)}
                    >
                      <FaEye /> Detalhes
                    </button>
                    <button
                      className="livros-btn-danger"
                      onClick={() => {
                        setLivroExcluir(livro);
                        setShowModal(true);
                      }}
                    >
                      <FaTrash /> Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {totalPaginas > 1 && (
        <div className="livros-paginacao">
          <button
            className="livros-paginacao-btn"
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
          >
            <FaChevronLeft />
          </button>
          <span>
            Página {pagina} de {totalPaginas}
          </span>
          <button
            className="livros-paginacao-btn"
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Modal de Cadastro */}
      {showCadastroModal && (
        <div className="livros-modal-bg">
          <div className="livros-modal">
            <button
              className="livros-modal-close"
              onClick={() => setShowCadastroModal(false)}
            >
              <FaTimes />
            </button>
            <h5 className="livros-modal-title">Cadastrar Novo Livro</h5>
            <div className="livros-modal-body">
              <input
                type="text"
                placeholder="Título"
                value={novoLivro.titulo}
                onChange={(e) =>
                  setNovoLivro({ ...novoLivro, titulo: e.target.value })
                }
              />
              <select
                value={novoLivro.autorId}
                onChange={(e) =>
                  setNovoLivro({ ...novoLivro, autorId: e.target.value })
                }
              >
                <option value="">Selecione um autor</option>
                {autores.map((autor) => (
                  <option key={autor.id} value={autor.id}>
                    {autor.nome}
                  </option>
                ))}
              </select>
              <select
                value={novoLivro.editoraId}
                onChange={(e) =>
                  setNovoLivro({ ...novoLivro, editoraId: e.target.value })
                }
              >
                <option value="">Selecione uma editora</option>
                {editoras.map((editora) => (
                  <option key={editora.id} value={editora.id}>
                    {editora.nome}
                  </option>
                ))}
              </select>
              <select
                value={novoLivro.categoriaId}
                onChange={(e) =>
                  setNovoLivro({ ...novoLivro, categoriaId: e.target.value })
                }
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Ano de Publicação"
                value={novoLivro.anoPublicacao}
                onChange={(e) =>
                  setNovoLivro({ ...novoLivro, anoPublicacao: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Número de Páginas"
                value={novoLivro.paginas}
                onChange={(e) =>
                  setNovoLivro({ ...novoLivro, paginas: e.target.value })
                }
              />
              <textarea
                placeholder="Sinopse"
                value={novoLivro.sinopse}
                onChange={(e) =>
                  setNovoLivro({ ...novoLivro, sinopse: e.target.value })
                }
              ></textarea>
              <input
                type="number"
                placeholder="Quantidade Disponível"
                value={novoLivro.quantidadeDisponivel}
                onChange={(e) =>
                  setNovoLivro({ ...novoLivro, quantidadeDisponivel: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="URL da Capa"
                value={novoLivro.capaUrl}
                onChange={(e) =>
                  setNovoLivro({ ...novoLivro, capaUrl: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="ISBN"
                value={novoLivro.isbn}
                onChange={(e) =>
                  setNovoLivro({ ...novoLivro, isbn: e.target.value })
                }
              />
            </div>
            <div className="livros-modal-actions">
              <button
                className="livros-btn-info"
                onClick={() => setShowCadastroModal(false)}
              >
                Cancelar
              </button>
              <button
                className="livros-btn-primary"
                onClick={handleCadastrarLivro}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      {showModal && (
        <div className="livros-modal-bg">
          <div className="livros-modal">
            <button
              className="livros-modal-close"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>
            <h5 className="livros-modal-title">Confirmar Exclusão</h5>
            <p>
              Tem certeza que deseja excluir o livro{" "}
              <strong>{livroExcluir?.titulo}</strong>?
            </p>
            <div className="livros-modal-actions">
              <button
                className="livros-btn-info"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="livros-btn-danger"
                onClick={() => handleExcluirLivro(livroExcluir.id)}
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      {livroDetalhes && (
        <div className="livros-modal-bg">
          <div className="livros-modal livros-detalhes-modal">
            <button
              className="livros-modal-close"
              onClick={() => setLivroDetalhes(null)}
            >
              <FaTimes />
            </button>
            <h5 className="livros-modal-title">Detalhes do Livro</h5>
            <div className="livros-detalhes-container">
              <div className="livros-detalhes-capa">
                <img src={livroDetalhes.capaUrl} alt={livroDetalhes.titulo} />
              </div>
              <div className="livros-detalhes-info">
                <p><strong>Título:</strong> {livroDetalhes.titulo}</p>
                <p><strong>Autor:</strong> {livroDetalhes.autorNome}</p>
                <p><strong>Editora:</strong> {livroDetalhes.editoraNome}</p>
                <p><strong>Categoria:</strong> {livroDetalhes.categoriaNome}</p>
                <p><strong>Ano de Publicação:</strong> {livroDetalhes.anoPublicacao}</p>
                <p><strong>Páginas:</strong> {livroDetalhes.paginas}</p>
                <p><strong>Quantidade Disponível:</strong> {livroDetalhes.quantidadeDisponivel}</p>
                <p><strong>Sinopse:</strong> {livroDetalhes.sinopse}</p>
                <p><strong>ISBN:</strong> {livroDetalhes.isbn}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {livroEditar && (
        <div className="livros-modal-bg">
          <div className="livros-modal">
            <button
              className="livros-modal-close"
              onClick={() => setLivroEditar(null)}
            >
              <FaTimes />
            </button>
            <h5 className="livros-modal-title">Editar Livro</h5>
            <div className="livros-modal-body">
              <input
                type="text"
                placeholder="Título"
                value={livroEditar.titulo}
                onChange={(e) =>
                  setLivroEditar({ ...livroEditar, titulo: e.target.value })
                }
              />
              <select
                value={livroEditar.autorId}
                onChange={(e) =>
                  setLivroEditar({ ...livroEditar, autorId: e.target.value })
                }
              >
                <option value="">Selecione um autor</option>
                {autores.map((autor) => (
                  <option key={autor.id} value={autor.id}>
                    {autor.nome}
                  </option>
                ))}
              </select>
              <select
                value={livroEditar.editoraId}
                onChange={(e) =>
                  setLivroEditar({ ...livroEditar, editoraId: e.target.value })
                }
              >
                <option value="">Selecione uma editora</option>
                {editoras.map((editora) => (
                  <option key={editora.id} value={editora.id}>
                    {editora.nome}
                  </option>
                ))}
              </select>
              <select
                value={livroEditar.categoriaId}
                onChange={(e) =>
                  setLivroEditar({ ...livroEditar, categoriaId: e.target.value })
                }
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Ano de Publicação"
                value={livroEditar.anoPublicacao}
                onChange={(e) =>
                  setLivroEditar({ ...livroEditar, anoPublicacao: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Número de Páginas"
                value={livroEditar.paginas}
                onChange={(e) =>
                  setLivroEditar({ ...livroEditar, paginas: e.target.value })
                }
              />
              <textarea
                placeholder="Sinopse"
                value={livroEditar.sinopse}
                onChange={(e) =>
                  setLivroEditar({ ...livroEditar, sinopse: e.target.value })
                }
              ></textarea>
              <input
                type="number"
                placeholder="Quantidade Disponível"
                value={livroEditar.quantidadeDisponivel}
                onChange={(e) =>
                  setLivroEditar({ ...livroEditar, quantidadeDisponivel: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="URL da Capa"
                value={livroEditar.capaUrl}
                onChange={(e) =>
                  setLivroEditar({ ...livroEditar, capaUrl: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="ISBN"
                value={livroEditar.isbn}
                onChange={(e) =>
                  setLivroEditar({ ...livroEditar, isbn: e.target.value })
                }
              />
            </div>
            <div className="livros-modal-actions">
              <button
                className="livros-btn-info"
                onClick={() => setLivroEditar(null)}
              >
                Cancelar
              </button>
              <button
                className="livros-btn-primary"
                onClick={handleEditarLivro}
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Livros;