// src/models/Task.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define a interface para a Tarefa
export interface ITask extends Document {
  title: string;
  description?: string;
  //status: 'todo' | 'doing' | 'done';
  status: string;
  createdAt: Date;
}

// Define o Schema da Tarefa
const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo' },
  createdAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Exporta o modelo
export default mongoose.model<ITask>('Task', TaskSchema);
