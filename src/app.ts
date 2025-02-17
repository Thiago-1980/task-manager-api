// src/app.ts
import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.routes';
import authRouter from './routes/auth.routes';

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas de tasks
app.use('/tasks', tasksRouter);

// Rotas de auth
app.use('/', authRouter);
// ou se quiser prefixar: app.use('/auth', authRouter);

// Rota raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo ao Task Manager API!');
});

// Rota de teste simples
app.get('/ping', (req, res) => {
    res.send('pong');
  });