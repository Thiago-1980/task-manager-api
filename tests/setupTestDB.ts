// tests/setupTestDB.ts
import mongoose from 'mongoose';

export async function connectTestDB() {
  await mongoose.connect('mongodb://localhost:27017/taskmanager_test');
}

export async function disconnectTestDB() {
  await mongoose.connection.dropDatabase(); // se quiser limpar dados no final
  await mongoose.connection.close();
}
