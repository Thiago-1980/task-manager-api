"use strict";
// import { Router } from 'express';
// import { User } from '../models/User'; // Ajustar o path
// import { Request, Response } from 'express';
// const router = Router();
// // Rota de registro
// router.post('/register', async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     // Verificar se já existe email cadastrado
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Usuário já existe' });
//     }
//     // Criar novo usuário
//     const newUser = new User({ email, password });
//     await newUser.save();
//     return res.status(201).json({ message: 'Usuário criado com sucesso' });
//   } catch (error: any) {
//     return res.status(500).json({ message: 'Erro no servidor', error: error.message });
//   }
// });
// export default router;
