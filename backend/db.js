import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Configuração da conexão com o banco de dados usando variáveis de ambiente
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool.promise();