import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaEye, FaTrash, FaExclamationTriangle, FaTimes, FaSearch, FaChevronLeft, FaChevronRight, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { listarAutores, cadastrarAutor, detalhesAutor, editarAutor, excluirAutor } from '../services/api';
import '../styles/Autores.css';

const PAGE_SIZE_OPTIONS = [10, 15, 20, 25, 30];

function getInitials(nome) {
  return nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const Autores = () => {
  const [autores, setAutores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [autorExcluir, setAutorExcluir] = useState(null);
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [ordem, setOrdem] = useState("az"); // "az" ou "za"
  const [pageSize, setPageSize] = useState(10);
  const [novoAutor, setNovoAutor] = useState(""); // Novo estado para o nome do autor
  const [showCadastroModal, setShowCadastroModal] = useState(false); // Modal de cadastro
  const [mensagemErro, setMensagemErro] = useState(""); // Estado para mensagens de erro
  const [autorEditar, setAutorEditar] = useState(null); // Estado para o autor em edição
  const [nomeEditado, setNomeEditado] = useState(""); // Estado para o nome editado
  const [autorDetalhes, setAutorDetalhes] = useState(null); // Estado para o autor selecionado para detalhes
  const [carregando, setCarregando] = useState(false); // Estado para indicar carregamento

  useEffect(() => {
    carregarAutores();
  }, []);

  const carregarAutores = async () => {
    setCarregando(true); // Inicia o carregamento
    try {
      const data = await listarAutores();
      setAutores(data);
    } catch (error) {
      setMensagemErro(error.mensagem || 'Erro ao carregar autores.');
      limparMensagem();
    } finally {
      setCarregando(false); // Finaliza o carregamento
    }
  };

  const handleCadastrarAutor = async () => {
    if (!novoAutor.trim()) {
      setMensagemErro("O nome do autor não pode estar vazio.");
      limparMensagem();
      return;
    }
    setCarregando(true); // Inicia o carregamento
    try {
      await cadastrarAutor({ nome: novoAutor });
      setShowCadastroModal(false);
      setNovoAutor("");
      setMensagemErro("Autor cadastrado com sucesso!");
      limparMensagem();
      await carregarAutores(); // Atualiza a lista de autores
    } catch (error) {
      console.error("Erro ao cadastrar autor:", error);
      setMensagemErro(error.response?.data?.mensagem || "Erro ao cadastrar autor.");
      limparMensagem();
    } finally {
      setCarregando(false); // Finaliza o carregamento
    }
  };

  const handleEditarAutor = async () => {
    if (!nomeEditado.trim()) {
      setMensagemErro("O nome do autor não pode estar vazio.");
      limparMensagem();
      return;
    }
    setCarregando(true); // Inicia o carregamento
    try {
      await editarAutor(autorEditar.id, { nome: nomeEditado });
      setAutorEditar(null);
      setNomeEditado("");
      setMensagemErro("Autor editado com sucesso!");
      limparMensagem();
      await carregarAutores(); // Atualiza a lista de autores
    } catch (error) {
      console.error("Erro ao editar autor:", error);
      setMensagemErro(error.response?.data?.mensagem || "Erro ao editar autor.");
      limparMensagem();
    } finally {
      setCarregando(false); // Finaliza o carregamento
    }
  };

  const handleExcluir = async (id) => {
    setCarregando(true); // Inicia o carregamento
    try {
      await excluirAutor(id);
      setShowModal(false);
      setMensagemErro("Autor excluído com sucesso!");
      limparMensagem();
      await carregarAutores(); // Atualiza a lista de autores
    } catch (error) {
      console.error("Erro ao excluir autor:", error);
      setMensagemErro(error.response?.data?.mensagem || "Erro ao excluir autor.");
      limparMensagem();
    } finally {
      setCarregando(false); // Finaliza o carregamento
    }
  };

  // Filtra autores pelo campo de busca
  let autoresFiltrados = autores.filter((autor) =>
    autor.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Ordenação alfabética
  autoresFiltrados = autoresFiltrados.sort((a, b) => {
    if (ordem === "az") {
      return a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" });
    } else {
      return b.nome.localeCompare(a.nome, "pt", { sensitivity: "base" });
    }
  });

  // Paginação
  const totalPaginas = Math.ceil(autoresFiltrados.length / pageSize);
  const autoresPagina = autoresFiltrados.slice(
    (pagina - 1) * pageSize,
    pagina * pageSize
  );

  // Resetar para página 1 ao buscar, mudar ordem ou mudar pageSize
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

  const limparMensagem = () => {
    setTimeout(() => {
      setMensagemErro('');
    }, 3000); // Limpa a mensagem após 3 segundos
  };

  return (
    <div className="autores-bg">
      {carregando && <div className="autores-carregando">Carregando...</div>} {/* Indicador de carregamento */}
      <h2 className="autores-title">Autores</h2>
      {mensagemErro && <div className="autores-erro">{mensagemErro}</div>}
      <div className="autores-filtros-container">
        <div className="autores-filtro-item">
          <div className="autores-busca-container">
            <FaSearch className="autores-busca-icon" />
            <input
              type="text"
              className="autores-busca-input"
              placeholder="Buscar autor..."
              value={busca}
              onChange={handleBuscaChange}
            />
          </div>
        </div>
        <div className="autores-filtro-item">
          <button
            className="autores-ordem-btn"
            onClick={handleOrdemChange}
            title={ordem === "az" ? "Ordem A-Z" : "Ordem Z-A"}
          >
            {ordem === "az" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
            {ordem === "az" ? "A-Z" : "Z-A"}
          </button>
        </div>
        <div className="autores-filtro-item">
          <select
            className="autores-page-size-select"
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
        <div className="autores-filtro-item">
          <button
            className="autores-btn-primary autores-btn-novo-autor"
            onClick={() => setShowCadastroModal(true)}
          >
            <FaPlus /> Novo Autor
          </button>
        </div>
      </div>
      <table className="autores-table">
        <thead>
          <tr>
            <th></th>
            <th style={{ width: "340px" }}>Nome</th>
            <th style={{ minWidth: "210px", width: "1%" }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {autoresPagina.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", color: "#888" }}>
                Nenhum autor encontrado.
              </td>
            </tr>
          ) : (
            autoresPagina.map((autor) => (
              <tr key={autor.id} className="autores-row">
                <td>
                  <div className="autores-avatar">{getInitials(autor.nome)}</div>
                </td>
                <td>{autor.nome}</td>
                <td>
                  <div className="autores-acoes-container">
                    <button
                      className="autores-btn-warning"
                      onClick={() => {
                        setAutorEditar(autor);
                        setNomeEditado(autor.nome);
                      }}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button
                      className="autores-btn-info"
                      onClick={() => setAutorDetalhes(autor)}
                    >
                      <FaEye /> Detalhes
                    </button>
                    <button
                      className="autores-btn-danger"
                      onClick={() => {
                        setAutorExcluir(autor);
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
      {/* Paginação */}
      {totalPaginas > 1 && (
        <div className="autores-paginacao">
          <button
            className="autores-paginacao-btn"
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
          >
            <FaChevronLeft />
          </button>
          <span>
            Página {pagina} de {totalPaginas}
          </span>
          <button
            className="autores-paginacao-btn"
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Modal de confirmação customizado */}
      {showModal && (
        <div className="autores-modal-bg">
          <div className="autores-modal">
            <button
              className="autores-modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <div className="autores-modal-icon">
              <FaExclamationTriangle size={40} color="#fbbf24" />
            </div>
            <h5 className="autores-modal-title">Confirmar Exclusão</h5>
            <p>
              Tem certeza que deseja excluir o autor{" "}
              <strong>{autorExcluir?.nome}</strong>?
            </p>
            <div className="autores-modal-actions">
              <button
                className="autores-btn-info"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="autores-btn-danger"
                onClick={() => handleExcluir(autorExcluir.id)}
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cadastro */}
      {showCadastroModal && (
        <div className="autores-modal-bg">
          <div className="autores-modal">
            <button
              className="autores-modal-close"
              onClick={() => {
                setShowCadastroModal(false);
                setMensagemErro(""); // Limpa mensagens de erro ao fechar o modal
              }}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <h5 className="autores-modal-title">
              {autorEditar ? "Editar Autor" : "Cadastrar Novo Autor"}
            </h5>
            <input
              type="text"
              className="autores-input"
              placeholder="Nome do autor"
              value={autorEditar ? nomeEditado : novoAutor}
              onChange={(e) => {
                if (autorEditar) {
                  setNomeEditado(e.target.value);
                } else {
                  setNovoAutor(e.target.value);
                }
              }}
            />
            {mensagemErro && <p className="autores-erro">{mensagemErro}</p>}
            <div className="autores-modal-actions">
              <button
                className="autores-btn-info"
                onClick={() => {
                  setShowCadastroModal(false);
                  setMensagemErro(""); // Limpa mensagens de erro ao cancelar
                }}
              >
                Cancelar
              </button>
              <button
                className="autores-btn-primary"
                onClick={autorEditar ? handleEditarAutor : handleCadastrarAutor}
              >
                {autorEditar ? "Salvar Alterações" : "Cadastrar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {autorEditar && (
        <div className="autores-modal-bg">
          <div className="autores-modal">
            <button
              className="autores-modal-close"
              onClick={() => {
                setAutorEditar(null);
                setMensagemErro(""); // Limpa mensagens de erro ao fechar o modal
              }}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <h5 className="autores-modal-title">Editar Autor</h5>
            <input
              type="text"
              className="autores-input"
              placeholder="Nome do autor"
              value={nomeEditado}
              onChange={(e) => setNomeEditado(e.target.value)}
            />
            {mensagemErro && <p className="autores-erro">{mensagemErro}</p>}
            <div className="autores-modal-actions">
              <button
                className="autores-btn-info"
                onClick={() => {
                  setAutorEditar(null);
                  setMensagemErro(""); // Limpa mensagens de erro ao cancelar
                }}
              >
                Cancelar
              </button>
              <button
                className="autores-btn-primary"
                onClick={handleEditarAutor}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalhes */}
      {autorDetalhes && (
        <div className="autores-modal-bg">
          <div className="autores-modal autores-modal-detalhes">
            <button
              className="autores-modal-close"
              onClick={() => setAutorDetalhes(null)}
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
            <h5 className="autores-modal-title">Detalhes do Autor</h5>
            <div className="autores-modal-body">
              <p>
                <strong>Nome:</strong> {autorDetalhes.nome}
              </p>
              <p>
                <strong>ID:</strong> {autorDetalhes.id}
              </p>
            </div>
            <div className="autores-modal-actions">
              <button
                className="autores-btn-primary"
                onClick={() => setAutorDetalhes(null)}
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

export default Autores;

// Exemplo para futuros filtros:
// const paisesMock = ["Brasil", "Argentina", "Portugal"];
// const paisesOrdenados = [...paisesMock].sort((a, b) => a.localeCompare(b, "pt", { sensitivity: "base" }));