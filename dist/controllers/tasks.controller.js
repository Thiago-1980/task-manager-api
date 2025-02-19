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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksController = exports.TasksController = void 0;
const tasks_service_1 = require("../services/tasks.service");
const task_validator_1 = require("../validators/task.validator");
class TasksController {
    getTasks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield tasks_service_1.taskService.getAllTasks();
                return res.json(tasks);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Valida o corpo da requisição
                const parsedData = task_validator_1.createTaskSchema.parse(req.body);
                // Se não der erro, prosseguimos
                const newTask = yield tasks_service_1.taskService.createTask(parsedData);
                return res.status(201).json(newTask);
            }
            catch (error) {
                // Se houver erro de validação (ZodError), lidamos aqui
                // ou passamos para um middleware de erro
                next(error);
            }
        });
    }
    updateTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedTask = yield tasks_service_1.taskService.updateTask(id, req.body);
                if (!updatedTask) {
                    return res.status(404).json({ error: 'Tarefa não encontrada.' });
                }
                return res.json(updatedTask);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedTask = yield tasks_service_1.taskService.deleteTask(id);
                if (!deletedTask) {
                    return res.status(404).json({ error: 'Tarefa não encontrada.' });
                }
                return res.json({ message: 'Tarefa deletada com sucesso.' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.TasksController = TasksController;
exports.tasksController = new TasksController();
