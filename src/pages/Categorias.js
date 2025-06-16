import React, { useState, useEffect } from "react";
import {
  FaPlus, FaEdit, FaEye, FaTrash, FaExclamationTriangle, FaTimes,
  FaSearch, FaChevronLeft, FaChevronRight, FaSortAlphaDown, FaSortAlphaUp
} from "react-icons/fa";
import api from "../services/api"; // Importa o serviço de API
import '../styles/Categorias.css';

const PAGE_SIZE_OPTIONS = [10, 15, 20, 25, 30];

function getInitials(nome) {
  return nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function Categorias() {
  const [categorias, setCategorias] = useState([]); // Inicializa como array vazio
  const [showModal, setShowModal] = useState(false);
  const [categoriaExcluir, setCategoriaExcluir] = useState(null);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [ordem, setOrdem] = useState("az"); // "az" ou "za"
  const [pageSize, setPageSize] = useState(10);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [categoriaEditar, setCategoriaEditar] = useState(null);
  const [nomeEditado, setNomeEditado] = useState("");
  const [categoriaDetalhes, setCategoriaDetalhes] = useState(null);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await api.get("/categorias");
        console.log("Resposta da API:", response.data); // Adicione este log
        setCategorias(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        setMensagemErro("Erro ao carregar a lista de categorias.");
      }
    }
    fetchCategorias();
  }, []);

  const handleCadastrarCategoria = async () => {
    if (!novaCategoria.trim()) {
      setMensagemErro("O nome da categoria não pode estar vazio.");
      return;
    }
    try {
      const response = await api.post("/categorias", { nome: novaCategoria }); // Corrige o endpoint
      if (response) {
        setCategorias((prev) => [...prev, response]);
        setShowCadastroModal(false);
        setNovaCategoria("");
        setMensagemErro(""); // Limpa mensagens de erro
      }
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
      setMensagemErro("Erro ao cadastrar categoria. Verifique sua conexão.");
    }
  };

  const handleEditarCategoria = async () => {
    if (!nomeEditado.trim()) {
      setMensagemErro("O nome da categoria não pode estar vazio.");
      return;
    }
    try {
      await api.put(`/categorias/${categoriaEditar.id}`, { nome: nomeEditado }); // Corrige o endpoint
      setCategorias((prev) =>
        prev.map((categoria) =>
          categoria.id === categoriaEditar.id ? { ...categoria, nome: nomeEditado } : categoria
        )
      );
      setCategoriaEditar(null);
      setNomeEditado("");
      setMensagemErro("");
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
      setMensagemErro("Erro ao editar categoria. Verifique sua conexão.");
    }
  };

  const handleExcluirCategoria = async (id) => {
    try {
      await api.delete(`/categorias/${id}`); // Corrige o endpoint
      setCategorias(categorias.filter((c) => c.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      setMensagemErro("Erro ao excluir categoria. Verifique sua conexão.");
    }
  };

  // Filtra categorias pelo campo de busca
  let categoriasFiltradas = categorias.filter((categoria) =>
    categoria.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Ordenação alfabética
  categoriasFiltradas = categoriasFiltradas.sort((a, b) => {
    if (ordem === "az") {
      return a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" });
    } else {
      return b.nome.localeCompare(a.nome, "pt", { sensitivity: "base" });
    }
  });

  // Paginação
  const totalPaginas = Math.ceil(categoriasFiltradas.length / pageSize);
  const categoriasPagina = categoriasFiltradas.slice(
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
    <div className="categorias-bg">
      <h2 className="categorias-title">Categorias</h2>
      {mensagemErro && <div className="categorias-erro">{mensagemErro}</div>}
      <div className="categorias-filtros-container">
        <div className="categorias-filtro-item">
          <div className="categorias-busca-container">
            <FaSearch className="categorias-busca-icon" />
            <input
              type="text"
              className="categorias-busca-input"
              placeholder="Buscar categoria..."
              value={busca}
              onChange={handleBuscaChange}
            />
          </div>
        </div>
        <div className="categorias-filtro-item">
          <button
            className="categorias-ordem-btn"
            onClick={handleOrdemChange}
            title={ordem === "az" ? "Ordem A-Z" : "Ordem Z-A"}
          >
            {ordem === "az" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
            {ordem === "az" ? "A-Z" : "Z-A"}
          </button>
        </div>
        <div className="categorias-filtro-item">
          <select
            className="categorias-page-size-select"
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
        <div className="categorias-filtro-item">
          <button
            className="categorias-btn-primary categorias-btn-novo-categoria"
            onClick={() => setShowCadastroModal(true)}
          >
            <FaPlus /> Nova Categoria
          </button>
        </div>
      </div>
      <table className="categorias-table">
        <thead>
          <tr>
            <th></th>
            <th style={{ width: "340px" }}>Nome</th>
            <th style={{ minWidth: "210px", width: "1%" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categoriasPagina.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", color: "#888" }}>
                Nenhuma categoria encontrada.
              </td>
            </tr>
          ) : (
            categoriasPagina.map((categoria) => (
              <tr key={categoria.id} className="categorias-row">
                <td>
                  <div className="categorias-avatar">{getInitials(categoria.nome)}</div>
                </td>
                <td>{categoria.nome}</td>
                <td>
                  <div className="categorias-acoes-container">
                    <button
                      className="categorias-btn-warning"
                      onClick={() => {
                        setCategoriaEditar(categoria);
                        setNomeEditado(categoria.nome);
                      }}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button className="categorias-btn-info" onClick={() => setCategoriaDetalhes(categoria)}>
                      <FaEye /> Detalhes
                    </button>
                    <button
                      className="categorias-btn-danger"
                      onClick={() => {
                        setCategoriaExcluir(categoria);
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
        <div className="categorias-paginacao">
          <button
            className="categorias-paginacao-btn"
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
          >
            <FaChevronLeft />
          </button>
          <span>
            Página {pagina} de {totalPaginas}
          </span>
          <button
            className="categorias-paginacao-btn"
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Modal de Exclusão */}
      {showModal && (
        <div className="categorias-modal-bg">
          <div className="categorias-modal">
            <button
              className="categorias-modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <div className="categorias-modal-icon">
              <FaExclamationTriangle size={40} color="#fbbf24" />
            </div>
            <h5 className="categorias-modal-title">Confirmar Exclusão</h5>
            <p>
              Tem certeza que deseja excluir a categoria{" "}
              <strong>{categoriaExcluir?.nome}</strong>?
            </p>
            <div className="categorias-modal-actions">
              <button
                className="categorias-btn-info"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="categorias-btn-danger"
                onClick={() => handleExcluirCategoria(categoriaExcluir.id)}
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cadastro */}
      {showCadastroModal && (
        <div className="categorias-modal-bg">
          <div className="categorias-modal">
            <button
              className="categorias-modal-close"
              onClick={() => {
                setShowCadastroModal(false);
                setMensagemErro(""); // Limpa mensagens de erro ao fechar o modal
              }}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <h5 className="categorias-modal-title">Cadastrar Nova Categoria</h5>
            <div className="categorias-modal-body">
              <input
                type="text"
                className="categorias-input"
                placeholder="Nome da categoria"
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
              />
              {mensagemErro && (
                <div className="categorias-mensagem-erro">{mensagemErro}</div>
              )}
            </div>
            <div className="categorias-modal-actions">
              <button
                className="categorias-btn-info"
                onClick={() => {
                  setShowCadastroModal(false);
                  setMensagemErro(""); // Limpa mensagens de erro ao cancelar
                }}
              >
                Cancelar
              </button>
              <button
                className="categorias-btn-primary"
                onClick={handleCadastrarCategoria}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {categoriaEditar && (
        <div className="categorias-modal-bg">
          <div className="categorias-modal">
            <button
              className="categorias-modal-close"
              onClick={() => {
                setCategoriaEditar(null);
                setMensagemErro("");
              }}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <h5 className="categorias-modal-title">Editar Categoria</h5>
            <input
              type="text"
              className="categorias-input"
              placeholder="Nome da categoria"
              value={nomeEditado}
              onChange={(e) => setNomeEditado(e.target.value)}
            />
            {mensagemErro && <p className="categorias-erro">{mensagemErro}</p>}
            <div className="categorias-modal-actions">
              <button
                className="categorias-btn-info"
                onClick={() => {
                  setCategoriaEditar(null);
                  setMensagemErro("");
                }}
              >
                Cancelar
              </button>
              <button
                className="categorias-btn-primary"
                onClick={handleEditarCategoria}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      {categoriaDetalhes && (
        <div className="categorias-modal-bg">
          <div className="categorias-modal categorias-modal-detalhes">
            <button
              className="categorias-modal-close"
              onClick={() => setCategoriaDetalhes(null)}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <h5 className="categorias-modal-title">Detalhes da Categoria</h5>
            <div className="categorias-modal-body">
              <p>
                <strong>Nome:</strong> {categoriaDetalhes.nome}
              </p>
              {/* Adicione mais campos de detalhes aqui, se necessário */}
            </div>
            <div className="categorias-modal-actions">
              <button
                className="categorias-btn-primary"
                onClick={() => setCategoriaDetalhes(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categorias;

