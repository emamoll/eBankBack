import { Router } from 'express';
import { userController } from '../../controllers/users';
import asyncHandler from 'express-async-handler';

const router = Router();

// Route de inicio para mostrar todos los usuarios

router.get('/', asyncHandler(userController.getUsers));

// Route para mostrar un usuario por su id

router.get('/:id', asyncHandler(userController.getUserById));

// Route para eliminar un usuario por su id

router.delete('/:id', asyncHandler(userController.deleteUser));

// Respuesta por default

router.use((req, res) => {
  res.status(404).json({
    msg: 'La ruta no existe'
  })
})

export default router;