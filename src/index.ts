// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import tasksRouter from './routes/tasks';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Configura o Express para aceitar JSON
app.use(express.json());
app.use(cors());

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Conexão com o MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskmanager';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch((err) => console.error('Erro ao conectar no MongoDB:', err));

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('Bem-vindo ao Task Manager API!');
});

// Usa o roteador para as rotas de tarefas
app.use('/tasks', tasksRouter);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
