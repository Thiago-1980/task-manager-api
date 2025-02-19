"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET || 'fallback-secret';
const authRouter = (0, express_1.Router)();
authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Usuário inválido' });
        }
        // Aqui, verificar a senha. Se estiver em texto plano no BD, compare direto.
        // Se usar hash, compare com bcrypt.
        if (user.password !== password) {
            return res.status(401).json({ message: 'Senha inválida' });
        }
        // Gerar token JWT (opcional, caso use token)
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login bem-sucedido', token });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
}));
authRouter.post('/forgot-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Este e-mail não está cadastrado' });
        }
        // Você pode customizar a estrutura do JSON conforme sua preferência.
        return res.status(200).json({
            message: 'Senha recuperada com sucesso',
            password: user.password
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao processar solicitação', error: error.message });
    }
}));
// Rota de registro
authRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Verificar se já existe email cadastrado
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }
        // Criar novo usuário
        const newUser = new User_1.User({ email, password });
        yield newUser.save();
        return res.status(201).json({ message: 'Usuário criado com sucesso' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
}));
exports.default = authRouter;
