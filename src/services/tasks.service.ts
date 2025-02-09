// src/services/tasks.service.ts
import Task, { ITask } from '../models/Task';

export class TaskService {
  public async getAllTasks(): Promise<ITask[]> {
    return Task.find();
  }

  public async createTask(data: Partial<ITask>): Promise<ITask> {
    const newTask = new Task(data);
    return newTask.save();
  }

  public async updateTask(id: string, data: Partial<ITask>): Promise<ITask | null> {
    return Task.findByIdAndUpdate(id, data, { new: true });
  }

  public async deleteTask(id: string): Promise<ITask | null> {
    return Task.findByIdAndDelete(id);
  }

  // Outras lógicas de negócio, filtros, paginação etc.
}

export const taskService = new TaskService();
