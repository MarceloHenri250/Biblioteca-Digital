import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Livros from "./pages/Livros";
import Favoritos from "./pages/Favoritos";
import Autores from "./pages/Autores";
import Editoras from "./pages/Editoras";
import Categorias from "./pages/Categorias";
import Usuarios from "./pages/Usuarios";
import RecuperarSenha from "./pages/RecuperarSenha";
import Perfil from "./pages/Perfil";
import Navbar from "./components/Navbar.js";
import Registrar from "./pages/Registrar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/livros" element={<Livros />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/autores" element={<Autores />} />
        <Route path="/editoras" element={<Editoras />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      </Routes>
    </Router>
  );
}

export default App;