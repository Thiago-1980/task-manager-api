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
const Task_1 = __importDefault(require("../models/Task")); // Ajuste o caminho conforme seu projeto
const authMiddleware_1 = require("../authMiddleware"); // Caminho conforme onde você criou
const router = (0, express_1.Router)();
// Usa o middleware de autenticação para todas as rotas de tarefas
router.use(authMiddleware_1.authMiddleware);
/**
 * GET /tasks
 * Lista as tarefas do usuário logado (req.userId)
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // userId que foi inserido no middleware
        const userId = req.userId;
        const tasks = yield Task_1.default.find({ userId });
        return res.json(tasks);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao listar tarefas', error });
    }
}));
/**
 * POST /tasks
 * Cria uma nova tarefa, vinculada ao userId do token
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { title, description } = req.body;
        const newTask = yield Task_1.default.create({
            title,
            description,
            // importante vincular o usuário
            userId
        });
        return res.status(201).json(newTask);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao criar tarefa', error });
    }
}));
/**
 * PUT /tasks/:id
 * Atualiza uma tarefa se ela pertencer ao usuário logado
 */
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { title, description, status } = req.body;
        const { id } = req.params;
        // Busca a tarefa pelo _id e userId
        const task = yield Task_1.default.findOne({ _id: id, userId });
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        task.title = title;
        task.description = description;
        task.status = status;
        yield task.save();
        return res.json(task);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
    }
}));
/**
 * DELETE /tasks/:id
 * Exclui uma tarefa se ela pertencer ao usuário logado
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const task = yield Task_1.default.findOneAndDelete({ _id: id, userId });
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
        return res.json({ message: 'Tarefa excluída com sucesso' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao excluir tarefa', error });
    }
}));
exports.default = router;
