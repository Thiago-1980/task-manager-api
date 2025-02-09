// tests/tasks.test.ts
import request from 'supertest';
import { app } from '../src/app';
import mongoose from 'mongoose';

describe('Tasks API', () => {
  beforeAll(async () => {
    // Conecte ao Mongo (separado) para teste
    await mongoose.connect('mongodb://localhost:27017/taskmanager_test');
  });

  afterAll(async () => {
    // Fecha conexão
    await mongoose.connection.close();
  });

  it('Deve listar as tarefas (GET /tasks)', async () => {
    const response = await request(app)
      .get('/tasks')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve criar uma nova tarefa (POST /tasks)', async () => {
    const newTask = { title: 'Tarefa de teste' };
    const response = await request(app)
      .post('/tasks')
      .send(newTask)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body).toHaveProperty('_id');
  });
});
