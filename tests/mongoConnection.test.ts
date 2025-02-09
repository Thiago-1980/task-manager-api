// tests/mongoConnection.test.ts
import mongoose from 'mongoose';

describe('MongoDB Connection Test', () => {
  it('Deve conectar no MongoDB local e depois desconectar', async () => {
    await mongoose.connect('mongodb://localhost:27017/taskmanager_test'); // ou outro nome de DB de teste
    expect(mongoose.connection.readyState).toBe(1); // 1 = conectado

    await mongoose.connection.close();
    expect(mongoose.connection.readyState).toBe(0); // 0 = desconectado
  });
});
