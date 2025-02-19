"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb'; // 'mongodb://localhost:27017/taskmanager'
// Conexão com o MongoDB
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log('Conectado ao MongoDB!');
    // Iniciar servidor apenas depois de conectar ao DB
    app_1.app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Erro ao conectar no MongoDB:', err);
});
