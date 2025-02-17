import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'fallback-secret';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  // O token geralmente vem no formato: "Bearer <TOKEN>"
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Token malformatado' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token malformatado' });
  }

  // Verifica se o token é válido
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Armazena o userId decodificado para uso na rota
    // Usamos casting para "any" ou definimos interface
    const { userId } = decoded as { userId: string };

    // Como o Request padrão não tem userId, adicionamos via casting
    (req as any).userId = userId;

    return next();
  });
}
