import { Response, NextFunction } from 'express';
import { UserDTO } from '../models/user/user.interface';
import Logger from '../services/logger';

// Funcion solo para administradores
export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  const user: UserDTO = req.user as UserDTO;

  Logger.info(`Es el administrador: ${user.firstName} ${user.lastName}`);

  const admin = user.admin;

  if (!admin) {
    Logger.error('No es administrador');
    return res.status(401).json({ msg: 'No esta autorizado, solamente administradores' });
  }

  next();
};
