import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import User, { type UserDocument } from '../models/User.js';
import { env } from '../config/env.js';

export interface AuthenticatedRequest extends Request {
  user?: UserDocument | null;
}

export async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Authentification requise.' });
    }

    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload & { sub?: string };

    if (!payload.sub) {
      return res.status(401).json({ message: 'Jeton invalide.' });
    }

    const user = await User.findById(payload.sub).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur introuvable.' });
    }

    req.user = user;
    return next();
  } catch (_error) {
    return res.status(401).json({ message: 'Jeton invalide ou expiré.' });
  }
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès administrateur requis.' });
  }

  return next();
}
