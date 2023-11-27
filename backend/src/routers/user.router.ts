import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import asyncHandler from 'express-async-handler';
const router = Router();
import auth from '../middlewares/auth.mid'

// Cargar datos de usuarios

router.get('/base', asyncHandler(UserController.getBase));

router.post('/login', asyncHandler(UserController.login));

router.post('/register', asyncHandler(UserController.register));

router.get('/admin/dashboard', asyncHandler(UserController.adminDashboard));

router.get('/profile', asyncHandler(UserController.userProfile));

router.get('/users', asyncHandler(UserController.getAllUsers));

router.get('/users/:id', asyncHandler(UserController.getUserById));

router.put('/users/:id', asyncHandler(UserController.updateUser));

router.delete('/users/:id', asyncHandler(UserController.deleteUser));

router.put('/updateProfile',auth, asyncHandler(UserController.updateProfile));

router.put('/changePassword',auth, asyncHandler(UserController.changePassword))

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios en YAVIFOOD
 *   x-order: 1  # Orden 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     USUARIOS:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         isAdmin:
 *           type: boolean
 */



/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Usuarios]
 *     summary: Iniciar sesión
 *     requestBody:
 *       description: Credenciales de inicio de sesión
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve el token de acceso
 *       400:
 *         description: Credenciales no válidas
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: [Usuarios]
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       description: Datos del nuevo usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                  type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error al registrar el usuario
 */

/**
 * @swagger
 * /api/users/admin/dashboard:
 *   get:
 *     tags: [Usuarios]
 *     summary: Panel de control de administrador
 *     responses:
 *       200:
 *         description: Bienvenido al panel de control de administrador
 *       401:
 *         description: Acceso no autorizado
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: [Usuarios]
 *     summary: Perfil de usuario
 *     responses:
 *       200:
 *         description: Bienvenido a tu perfil de cliente
 *       401:
 *         description: Acceso no autorizado
 */

/**
 * @swagger
 * /api/users/users:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error al obtener usuarios
 */

/**
 * @swagger
 * /api/users/users/{id}:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtener información sobre un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del usuario
 *       400:
 *         description: Usuario no encontrado
 *
 *   put:
 *     tags: [Usuarios]
 *     summary: Actualizar información de un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Datos actualizados del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error al actualizar el usuario
 *       401:
 *         description: Acceso no autorizado
 *
 *   delete:
 *     tags: [Usuarios]
 *     summary: Eliminar un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       400:
 *         description: Error al eliminar el usuario
 *       401:
 *         description: Acceso no autorizado
 */





export default router;
