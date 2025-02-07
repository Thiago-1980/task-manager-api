// src/routes/tasks.ts
import { Router } from 'express';
import Task, { ITask } from '../models/Task';

const router = Router();

// GET /tasks - Listar todas as tarefas
router.get('/', async (req, res) => {
  try {
    const tasks: ITask[] = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas.' });
  }
});

// POST /tasks - Criar uma nova tarefa
router.post('/', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = new Task({ title, description, status });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa.' });
  }
});

// PUT /tasks/:id - Atualizar uma tarefa
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
  }
});

// DELETE /tasks/:id - Deletar uma tarefa
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    res.json({ message: 'Tarefa deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tarefa.' });
  }
});

export default router;
