import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Título não pode ser vazio'),
  description: z.string().optional(),
  status: z.enum(['todo', 'doing', 'done']).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
