// src/routes/tasks.routes.ts
import { tasksController } from '../controllers/tasks.controller';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => tasksController.getTasks(req, res, next));
router.post('/', (req, res, next) => tasksController.createTask(req, res, next));
router.put('/:id', (req, res, next) => tasksController.updateTask(req, res, next));
router.delete('/:id', (req, res, next) => tasksController.deleteTask(req, res, next));

export default router;
