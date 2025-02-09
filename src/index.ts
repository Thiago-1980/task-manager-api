// src/index.ts
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskmanager';

// Conexão com o MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB!');
    // Iniciar servidor apenas depois de conectar ao DB
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no MongoDB:', err);
  });
