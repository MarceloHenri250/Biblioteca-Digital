import React, { useState, useEffect } from "react";
import {
  FaPlus, FaEdit, FaEye, FaTrash, FaExclamationTriangle, FaTimes,
  FaSearch, FaChevronLeft, FaChevronRight, FaSortAlphaDown, FaSortAlphaUp
} from "react-icons/fa";
import api from "../services/api"; // Importa o serviço de API
import '../styles/Editoras.css';

const PAGE_SIZE_OPTIONS = [10, 15, 20, 25, 30];

function getInitials(nome) {
  return nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function Editoras() {
  const [editoras, setEditoras] = useState([]); // Inicializa como array vazio
  const [showModal, setShowModal] = useState(false);
  const [editoraExcluir, setEditoraExcluir] = useState(null);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [ordem, setOrdem] = useState("az"); // "az" ou "za"
  const [pageSize, setPageSize] = useState(10);
  const [novaEditora, setNovaEditora] = useState("");
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [editoraEditar, setEditoraEditar] = useState(null);
  const [nomeEditado, setNomeEditado] = useState("");
  const [editoraDetalhes, setEditoraDetalhes] = useState(null);

  useEffect(() => {
    async function fetchEditoras() {
      try {
        const response = await api.get("/editoras");
        console.log("Resposta da API:", response.data); // Adicione este log
        setEditoras(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar editoras:", error);
        setMensagemErro("Erro ao carregar a lista de editoras.");
      }
    }
    fetchEditoras();
  }, []);

  const handleCadastrarEditora = async () => {
    if (!novaEditora.trim()) {
      setMensagemErro("O nome da editora não pode estar vazio.");
      return;
    }
    try {
      const response = await api.post("/editoras", { nome: novaEditora }); // Corrige o endpoint
      if (response) {
        setEditoras((prev) => [...prev, response]);
        setShowCadastroModal(false);
        setNovaEditora("");
        setMensagemErro(""); // Limpa mensagens de erro
      }
    } catch (error) {
      console.error("Erro ao cadastrar editora:", error);
      setMensagemErro("Erro ao cadastrar editora. Verifique sua conexão.");
    }
  };

  const handleEditarEditora = async () => {
    if (!nomeEditado.trim()) {
      setMensagemErro("O nome da editora não pode estar vazio.");
      return;
    }
    try {
      await api.put(`/editoras/${editoraEditar.id}`, { nome: nomeEditado }); // Corrige o endpoint
      setEditoras((prev) =>
        prev.map((editora) =>
          editora.id === editoraEditar.id ? { ...editora, nome: nomeEditado } : editora
        )
      );
      setEditoraEditar(null);
      setNomeEditado("");
      setMensagemErro("");
    } catch (error) {
      console.error("Erro ao editar editora:", error);
      setMensagemErro("Erro ao editar editora. Verifique sua conexão.");
    }
  };

  const handleExcluirEditora = async (id) => {
    try {
      await api.delete(`/editoras/${id}`); // Corrige o endpoint
      setEditoras(editoras.filter((e) => e.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao excluir editora:", error);
      setMensagemErro("Erro ao excluir editora. Verifique sua conexão.");
    }
  };

  // Filtra editoras pelo campo de busca
  let editorasFiltradas = editoras.filter((editora) =>
    editora.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Ordenação alfabética
  editorasFiltradas = editorasFiltradas.sort((a, b) => {
    if (ordem === "az") {
      return a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" });
    } else {
      return b.nome.localeCompare(a.nome, "pt", { sensitivity: "base" });
    }
  });

  // Paginação
  const totalPaginas = Math.ceil(editorasFiltradas.length / pageSize);
  const editorasPagina = editorasFiltradas.slice(
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
    <div className="editoras-bg">
      <h2 className="editoras-title">Editoras</h2>
      {mensagemErro && <div className="editoras-erro">{mensagemErro}</div>}
      <div className="editoras-filtros-container">
        <div className="editoras-filtro-item">
          <div className="editoras-busca-container">
            <FaSearch className="editoras-busca-icon" />
            <input
              type="text"
              className="editoras-busca-input"
              placeholder="Buscar editora..."
              value={busca}
              onChange={handleBuscaChange}
            />
          </div>
        </div>
        <div className="editoras-filtro-item">
          <button
            className="editoras-ordem-btn"
            onClick={handleOrdemChange}
            title={ordem === "az" ? "Ordem A-Z" : "Ordem Z-A"}
          >
            {ordem === "az" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
            {ordem === "az" ? "A-Z" : "Z-A"}
          </button>
        </div>
        <div className="editoras-filtro-item">
          <select
            className="editoras-page-size-select"
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
        <div className="editoras-filtro-item">
          <button
            className="editoras-btn-primary editoras-btn-novo-editora"
            onClick={() => setShowCadastroModal(true)}
          >
            <FaPlus /> Nova Editora
          </button>
        </div>
      </div>
      <table className="editoras-table">
        <thead>
          <tr>
            <th></th>
            <th style={{ width: "340px" }}>Nome</th>
            <th style={{ minWidth: "210px", width: "1%" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {editorasPagina.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", color: "#888" }}>
                Nenhuma editora encontrada.
              </td>
            </tr>
          ) : (
            editorasPagina.map((editora) => (
              <tr key={editora.id} className="editoras-row">
                <td>
                  <div className="editoras-avatar">{getInitials(editora.nome)}</div>
                </td>
                <td>{editora.nome}</td>
                <td>
                  <div className="editoras-acoes-container">
                    <button
                      className="editoras-btn-warning"
                      onClick={() => {
                        setEditoraEditar(editora);
                        setNomeEditado(editora.nome);
                      }}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button
                      className="editoras-btn-info"
                      onClick={() => setEditoraDetalhes(editora)}
                    >
                      <FaEye /> Detalhes
                    </button>
                    <button
                      className="editoras-btn-danger"
                      onClick={() => {
                        setEditoraExcluir(editora);
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
        <div className="editoras-paginacao">
          <button
            className="editoras-paginacao-btn"
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
          >
            <FaChevronLeft />
          </button>
          <span>
            Página {pagina} de {totalPaginas}
          </span>
          <button
            className="editoras-paginacao-btn"
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Modal de Exclusão */}
      {showModal && (
        <div className="editoras-modal-bg">
          <div className="editoras-modal">
            <button
              className="editoras-modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <div className="editoras-modal-icon">
              <FaExclamationTriangle size={40} color="#fbbf24" />
            </div>
            <h5 className="editoras-modal-title">Confirmar Exclusão</h5>
            <p>
              Tem certeza que deseja excluir a editora <strong>{editoraExcluir?.nome}</strong>?
            </p>
            <div className="editoras-modal-actions">
              <button
                className="editoras-btn-info"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="editoras-btn-danger"
                onClick={() => handleExcluirEditora(editoraExcluir.id)}
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para cadastro de nova editora */}
      {showCadastroModal && (
        <div className="editoras-modal-bg">
          <div className="editoras-modal editoras-modal-cadastro">
            <button
              className="editoras-modal-close"
              onClick={() => {
                setShowCadastroModal(false);
                setMensagemErro(""); // Limpa mensagens de erro ao fechar o modal
              }}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <h5 className="editoras-modal-title">Cadastrar Nova Editora</h5>
            <div className="editoras-modal-body">
              <input
                type="text"
                className="editoras-input"
                placeholder="Nome da editora"
                value={novaEditora}
                onChange={(e) => setNovaEditora(e.target.value)}
              />
              {mensagemErro && (
                <div className="editoras-mensagem-erro">{mensagemErro}</div>
              )}
            </div>
            <div className="editoras-modal-actions">
              <button
                className="editoras-btn-info"
                onClick={() => {
                  setShowCadastroModal(false);
                  setMensagemErro(""); // Limpa mensagens de erro ao cancelar
                }}
              >
                Cancelar
              </button>
              <button
                className="editoras-btn-primary"
                onClick={handleCadastrarEditora}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {editoraEditar && (
        <div className="editoras-modal-bg">
          <div className="editoras-modal">
            <button
              className="editoras-modal-close"
              onClick={() => {
                setEditoraEditar(null);
                setMensagemErro("");
              }}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <h5 className="editoras-modal-title">Editar Editora</h5>
            <input
              type="text"
              className="editoras-input"
              placeholder="Nome da editora"
              value={nomeEditado}
              onChange={(e) => setNomeEditado(e.target.value)}
            />
            {mensagemErro && <p className="editoras-erro">{mensagemErro}</p>}
            <div className="editoras-modal-actions">
              <button
                className="editoras-btn-info"
                onClick={() => {
                  setEditoraEditar(null);
                  setMensagemErro("");
                }}
              >
                Cancelar
              </button>
              <button
                className="editoras-btn-primary"
                onClick={handleEditarEditora}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      {editoraDetalhes && (
        <div className="editoras-modal-bg">
          <div className="editoras-modal editoras-modal-detalhes">
            <button
              className="editoras-modal-close"
              onClick={() => setEditoraDetalhes(null)}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <h5 className="editoras-modal-title">Detalhes da Editora</h5>
            <div className="editoras-modal-body">
              <p>
                <strong>Nome:</strong> {editoraDetalhes.nome}
              </p>
              {/* Adicione mais campos de detalhes aqui, se necessário */}
            </div>
            <div className="editoras-modal-actions">
              <button
                className="editoras-btn-primary"
                onClick={() => setEditoraDetalhes(null)}
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

export default Editoras;
