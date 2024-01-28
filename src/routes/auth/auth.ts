import { Router } from 'express';
import { userController } from '../../controllers/users';
import asyncHadler from 'express-async-handler';

const router = Router();

// Route de login del usuario

router.post('/login', userController.validUserAndPassword, asyncHadler(userController.login));

// Route de signup del usuario

router.post('/signup', userController.existsEmail, userController.userLegal, userController.comparePassword, asyncHadler(userController.signup as any));

// Respuesta por default

router.use((req, res) => {
  res.status(404).json({
    msg: 'La ruta no existe'
  });
});

export default router;