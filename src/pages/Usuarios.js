import React, { useState } from "react";
import '../styles/Usuarios.css';
import { FaSearch, FaChevronLeft, FaChevronRight, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const usuariosMock = [
  { id: 1, nome: "João Silva", email: "joao.silva@example.com", role: "Usuario" },
  { id: 2, nome: "Maria Oliveira", email: "maria.oliveira@example.com", role: "Administrador" },
  { id: 3, nome: "Carlos Souza", email: "carlos.souza@example.com", role: "Usuario" },
  { id: 4, nome: "Ana Costa", email: "ana.costa@example.com", role: "Usuario" },
  { id: 5, nome: "Fernanda Lima", email: "fernanda.lima@example.com", role: "Administrador" },
];

const PAGE_SIZE_OPTIONS = [10, 15, 20, 25, 30];

function Usuarios() {
  const [usuarios, setUsuarios] = useState(usuariosMock);
  const [busca, setBusca] = useState("");
  const [roleFiltro, setRoleFiltro] = useState("");
  const [ordem, setOrdem] = useState("az");
  const [pagina, setPagina] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [successMessage, setSuccessMessage] = useState("");

  const handleRoleChange = (userId, novoPapel) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.id === userId ? { ...usuario, role: novoPapel } : usuario
      )
    );
    setSuccessMessage("Papel alterado com sucesso!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDeleteUser = (userId) => {
    setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== userId));
    setSuccessMessage("Usuário excluído com sucesso!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const usuariosFiltrados = usuarios
    .filter((usuario) => {
      const buscaLower = busca.toLowerCase();
      return (
        (!busca || usuario.nome.toLowerCase().includes(buscaLower) || usuario.email.toLowerCase().includes(buscaLower)) &&
        (!roleFiltro || usuario.role === roleFiltro)
      );
    })
    .sort((a, b) =>
      ordem === "az"
        ? a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" })
        : b.nome.localeCompare(a.nome, "pt", { sensitivity: "base" })
    );

  const totalPaginas = Math.ceil(usuariosFiltrados.length / pageSize);
  const usuariosPagina = usuariosFiltrados.slice((pagina - 1) * pageSize, pagina * pageSize);

  const handleBuscaChange = (e) => {
    setBusca(e.target.value);
    setPagina(1);
  };

  const handleRoleFiltroChange = (e) => {
    setRoleFiltro(e.target.value);
    setPagina(1);
  };

  const handleOrdemChange = () => {
    setOrdem((prev) => (prev === "az" ? "za" : "az"));
    setPagina(1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPagina(1);
  };

  return (
    <div className="usuarios-bg">
      <h2 className="usuarios-title">Usuários Cadastrados</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <div className="usuarios-filtros-container">
        <div className="usuarios-filtro-item">
          <div className="usuarios-busca-container">
            <FaSearch className="usuarios-busca-icon" />
            <input
              type="text"
              className="usuarios-busca-input"
              placeholder="Buscar por nome ou email..."
              value={busca}
              onChange={handleBuscaChange}
            />
          </div>
        </div>
        <div className="usuarios-filtro-item">
          <select
            className="usuarios-filtro-input"
            value={roleFiltro}
            onChange={handleRoleFiltroChange}
          >
            <option value="">Todos os Papéis</option>
            {["Administrador", "Usuario"].sort().map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="usuarios-filtro-item">
          <select
            className="usuarios-page-size-select"
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
        <div className="usuarios-filtro-item">
          <button
            className="usuarios-ordem-btn"
            onClick={handleOrdemChange}
            title={ordem === "az" ? "Ordem A-Z" : "Ordem Z-A"}
          >
            {ordem === "az" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
            {ordem === "az" ? "A-Z" : "Z-A"}
          </button>
        </div>
      </div>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Papel Atual</th>
            <th>Novo Papel</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuariosPagina.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "#888" }}>
                Nenhum usuário encontrado.
              </td>
            </tr>
          ) : (
            usuariosPagina.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>
                  <span
                    className={`badge ${
                      usuario.role === "Administrador" ? "badge-admin" : "badge-user"
                    }`}
                  >
                    {usuario.role}
                  </span>
                </td>
                <td>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const novoPapel = e.target.novoPapel.value;
                      handleRoleChange(usuario.id, novoPapel);
                    }}
                    className="usuarios-form"
                  >
                    <select name="novoPapel" className="usuarios-select" defaultValue={usuario.role}>
                      <option value="Usuario">Usuario</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                    <button type="submit" className="usuarios-btn">
                      Salvar
                    </button>
                  </form>
                </td>
                <td>
                  <button
                    className="usuarios-btn usuarios-btn-danger"
                    onClick={() => handleDeleteUser(usuario.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {totalPaginas > 1 && (
        <div className="usuarios-paginacao">
          <button
            className="usuarios-paginacao-btn"
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
          >
            <FaChevronLeft />
          </button>
          <span>
            Página {pagina} de {totalPaginas}
          </span>
          <button
            className="usuarios-paginacao-btn"
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default Usuarios;

