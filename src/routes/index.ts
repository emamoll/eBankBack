import { Router } from 'express';
import AuthRouter from './auth/auth';
import { isAdmin } from '../middlewares/authorization';
import UsersRouter from './users/users';

import { userController } from '../controllers/users';

const router = Router();

// Routes de autenticacion del usuario

router.use('/auth', AuthRouter);

// Routes de usuarios (solo admin)

router.use('/users', userController.userCheckAuth, isAdmin, UsersRouter);

export default router;