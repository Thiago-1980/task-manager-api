import { Router, Request, Response } from 'express';
import Task from '../models/Task'; // Ajuste o caminho conforme seu projeto
import { authMiddleware } from '../authMiddleware'; // Caminho conforme onde você criou

const router = Router();

// Usa o middleware de autenticação para todas as rotas de tarefas
router.use(authMiddleware);

/**
 * GET /tasks
 * Lista as tarefas do usuário logado (req.userId)
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // userId que foi inserido no middleware
    const userId = (req as any).userId;

    const tasks = await Task.find({ userId });
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar tarefas', error });
  }
});

/**
 * POST /tasks
 * Cria uma nova tarefa, vinculada ao userId do token
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { title, description } = req.body;

    const newTask = await Task.create({
      title,
      description,
      // importante vincular o usuário
      userId
    });

    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar tarefa', error });
  }
});

/**
 * PUT /tasks/:id
 * Atualiza uma tarefa se ela pertencer ao usuário logado
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { title, description, status } = req.body;
    const { id } = req.params;

    // Busca a tarefa pelo _id e userId
    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    task.title = title;
    task.description = description;
    task.status = status;
    
    await task.save();

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar tarefa', error });
  }
});

/**
 * DELETE /tasks/:id
 * Exclui uma tarefa se ela pertencer ao usuário logado
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId });
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    return res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao excluir tarefa', error });
  }
});

export default router;
