import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import Task, { ITask } from '../models/Task';

const router = Router();

/** GET /tasks */
const getTasksHandler: RequestHandler = async (req, res, next) => {
  try {
    const tasks: ITask[] = await Task.find();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};
router.get('/', getTasksHandler);

/** POST /tasks */
const createTaskHandler: RequestHandler = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const newTask = new Task({ title, description, status });
    const savedTask = await newTask.save();
    return res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};
router.post('/', createTaskHandler);

/** PUT /tasks/:id */
const updateTaskHandler: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    return res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};
router.put('/:id', updateTaskHandler);

/** DELETE /tasks/:id */
const deleteTaskHandler: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    return res.json({ message: 'Tarefa deletada com sucesso.' });
  } catch (error) {
    next(error);
  }
};
router.delete('/:id', deleteTaskHandler);

export default router;
