"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
exports.app = (0, express_1.default)();
// Middlewares
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// Rotas de tasks
exports.app.use('/tasks', tasks_routes_1.default);
// Rotas de auth
exports.app.use('/', auth_routes_1.default);
// ou se quiser prefixar: app.use('/auth', authRouter);
// Rota raiz
exports.app.get('/', (req, res) => {
    res.send('Bem-vindo ao Task Manager API!');
});
// Rota de teste simples
exports.app.get('/ping', (req, res) => {
    res.send('pong');
});
