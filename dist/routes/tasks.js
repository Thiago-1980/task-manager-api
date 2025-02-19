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
// src/routes/tasks.ts
const express_1 = require("express");
const Task_1 = __importDefault(require("../models/Task"));
const router = (0, express_1.Router)();
// GET /tasks - Listar todas as tarefas
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar tarefas.' });
    }
}));
// POST /tasks - Criar uma nova tarefa
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status } = req.body;
        const newTask = new Task_1.default({ title, description, status });
        const savedTask = yield newTask.save();
        res.status(201).json(savedTask);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar tarefa.' });
    }
}));
// PUT /tasks/:id - Atualizar uma tarefa
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const updatedTask = yield Task_1.default.findByIdAndUpdate(id, { title, description, status }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }
        res.json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
    }
}));
// DELETE /tasks/:id - Deletar uma tarefa
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTask = yield Task_1.default.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }
        res.json({ message: 'Tarefa deletada com sucesso.' });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar tarefa.' });
    }
}));
exports.default = router;
