"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Título não pode ser vazio'),
    description: zod_1.z.string().optional(),
    status: zod_1.z.enum(['todo', 'doing', 'done']).optional(),
});
