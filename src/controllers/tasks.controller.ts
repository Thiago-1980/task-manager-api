// src/controllers/tasks.controller.ts
import { Request, Response, NextFunction } from 'express';
import { taskService } from '../services/tasks.service';
import { createTaskSchema } from '../validators/task.validator';

export class TasksController {
  public async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await taskService.getAllTasks();
      return res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  public async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      // Valida o corpo da requisição
      const parsedData = createTaskSchema.parse(req.body);
  
      // Se não der erro, prosseguimos
      const newTask = await taskService.createTask(parsedData);
      return res.status(201).json(newTask);
    } catch (error) {
      // Se houver erro de validação (ZodError), lidamos aqui
      // ou passamos para um middleware de erro
      next(error);
    }
  }

  public async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updatedTask = await taskService.updateTask(id, req.body);
      if (!updatedTask) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
      }
      return res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  public async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedTask = await taskService.deleteTask(id);
      if (!deletedTask) {
        return res.status(404).json({ error: 'Tarefa não encontrada.' });
      }
      return res.json({ message: 'Tarefa deletada com sucesso.' });
    } catch (error) {
      next(error);
    }
  }
}

export const tasksController = new TasksController();
