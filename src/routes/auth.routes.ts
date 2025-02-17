import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'fallback-secret';

const authRouter = Router();


authRouter.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Usuário inválido' });
      }
  
      // Aqui, verificar a senha. Se estiver em texto plano no BD, compare direto.
      // Se usar hash, compare com bcrypt.
      if (user.password !== password) {
        return res.status(401).json({ message: 'Senha inválida' });
      }
  
      // Gerar token JWT (opcional, caso use token)
      const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1h' });
  
      return res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
});

authRouter.post('/forgot-password', async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'Este e-mail não está cadastrado' });
      }
  
      // Você pode customizar a estrutura do JSON conforme sua preferência.
      return res.status(200).json({
        message: 'Senha recuperada com sucesso',
        password: user.password
      });
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro ao processar solicitação', error: error.message });
    }
});

// Rota de registro
authRouter.post('/register', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Verificar se já existe email cadastrado
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Usuário já existe' });
      }
  
      // Criar novo usuário
      const newUser = new User({ email, password });
      await newUser.save();
  
      return res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
});

  export default authRouter;