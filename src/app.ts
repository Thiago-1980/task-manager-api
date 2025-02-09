// src/app.ts
import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.routes';

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/tasks', tasksRouter);

// Rota raiz opcional
app.get('/', (req, res) => {
  res.send('Bem-vindo ao Task Manager API!');
});

// Rota de teste simples
app.get('/ping', (req, res) => {
    res.send('pong');
  });