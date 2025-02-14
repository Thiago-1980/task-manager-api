import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
  // Você pode adicionar outros campos conforme necessidade (ex: name, createdAt etc.)
});

// Exportar o model
export const User = mongoose.model('User', userSchema);
