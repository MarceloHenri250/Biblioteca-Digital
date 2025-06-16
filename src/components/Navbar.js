import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo_BookSphere.jpeg";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar-booksphere">
      <Link to="/" className="navbar-logo-link">
        <img src={logo} alt="BookSphere Logo" className="navbar-logo-img" />
        <span className="navbar-logo-text">
          Book<span className="navbar-logo-sphere">Sphere</span>
        </span>
      </Link>
      <div className="navbar-links">
        <NavLink to="/" className="navbar-link" end>
          Home
        </NavLink>
        <NavLink to="/livros" className="navbar-link">
          Livros
        </NavLink>
        <NavLink to="/autores" className="navbar-link">
          Autores
        </NavLink>
        <NavLink to="/editoras" className="navbar-link">
          Editoras
        </NavLink>
        <NavLink to="/categorias" className="navbar-link">
          Categorias
        </NavLink>
        <NavLink to="/favoritos" className="navbar-link">
          Favoritos
        </NavLink>
        <NavLink to="/usuarios" className="navbar-link">
          Usuários
        </NavLink>   
        <NavLink to="/perfil" className="navbar-link">
          Perfil
        </NavLink>
        <NavLink to="/login" className="navbar-link">
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
