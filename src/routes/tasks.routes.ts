// src/routes/tasks.routes.ts
import { tasksController } from '../controllers/tasks.controller';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { Router, Request, Response } from 'express';
import { User } from '../models/User'; // Ajuste o path ao seu model

const router = Router();

router.get('/', (req, res, next) => tasksController.getTasks(req, res, next));
router.post('/', (req, res, next) => tasksController.createTask(req, res, next));
router.put('/:id', (req, res, next) => tasksController.updateTask(req, res, next));
router.delete('/:id', (req, res, next) => tasksController.deleteTask(req, res, next));

router.post('/login', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
  
      // Aqui, verificar a senha. Se estiver em texto plano no BD, compare direto.
      // Se usar hash, compare com bcrypt.
      if (user.password !== password) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
  
      // Gerar token JWT (opcional, caso use token)
      const token = jwt.sign({ userId: user._id }, 'segredo', { expiresIn: '1h' });
  
      return res.status(200).json({ token });
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
});

router.post('/forgot-password', async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'Não há e-mail cadastrado' });
      }
  
      // Enviar email com a senha
      // Configurar transportador do nodemailer (exemplo simples)
      let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: 'teste.programacao.thiago@gmail.com',
          pass: 'Thi@go!80'
        }
      });
  
      const mailOptions = {
        from: 'teste.programacao.thiago@gmail.com',
        to: user.email,
        subject: 'Recuperação de senha - Sistema Thiago Task Manager',
        text: `Sua senha é: ${user.password}`
      };
  
      await transporter.sendMail(mailOptions);
  
      return res.status(200).json({ message: 'Senha enviada para seu email' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Erro ao processar solicitação', error: error.message });
    }
});

// Rota de registro
router.post('/register', async (req: Request, res: Response) => {
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

export default router;
