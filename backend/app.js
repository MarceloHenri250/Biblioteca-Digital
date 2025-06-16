import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuariosRoutes.js';
import autoresRoutes from './routes/autoresRoutes.js';
import editorasRoutes from './routes/editorasRoutes.js'; // Importa rotas de editoras
import categoriasRoutes from './routes/categoriasRoutes.js'; // Importa rotas de categorias
import livrosRoutes from './routes/livrosRoutes.js'; // Importa rotas de livros

const app = express();
const PORT = 3001;

// Middleware para processar JSON
app.use(express.json());

// Middleware para lidar com CORS
app.use(cors());

// Rotas
app.use('/usuarios', usuariosRoutes);
app.use('/autores', autoresRoutes);
app.use('/editoras', editorasRoutes); // Certifique-se de que esta rota está registrada
app.use('/categorias', categoriasRoutes); // Certifique-se de que esta rota está registrada
app.use('/livros', livrosRoutes); // Certifique-se de que esta rota está registrada

// Rota padrão
app.get('/', (req, res) => {
  res.send('API do BookSphere está funcionando!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});