// routers/food.router.ts
import { Router } from 'express';
import * as FoodController from '../controllers/food.controller';

const router = Router();
router.get('/base', FoodController.getBase);
router.get('/', FoodController.getAllFoods);
router.get('/search/:searchTerm', FoodController.searchFoods);
router.get('/tags', FoodController.getTags);
router.get('/tag/:tagName', FoodController.getFoodsByTag);
router.get('/:foodId', FoodController.getFoodById);
router.post('/', FoodController.createFood);
router.put('/:foodId', FoodController.updateFood);
router.delete('/:foodId', FoodController.deleteFood);
/**
 * @swagger
 * tags:
 *   name: Alimentos
 *   description: Endpoints para la gestión de platillos de comida
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PLATILLOS:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         favorite:
 *           type: boolean
 *         stars:
 *           type: number
 *         imageUrl:
 *           type: string
 *         origins:
 *           type: array
 *           items:
 *             type: string
 *         cookTime:
 *           type: string
 */


/**
 * @swagger
 * /api/foods:
 *   get:
 *     tags: [Alimentos]
 *     summary: Obtener todos los alimentos
 *     description: Obtiene la lista completa de alimentos.
 *     responses:
 *       200:
 *         description: Lista de alimentos
 *       500:
 *         description: Error al obtener alimentos
 *   post:
 *     summary: Crear un nuevo alimento
 *     tags: [Alimentos]
 *     requestBody:
 *       description: Datos del nuevo alimento
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               favorite:
 *                 type: boolean
 *               stars:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               origins:
 *                 type: array
 *                 items:
 *                   type: string
 *               cookTime:
 *                 type: string
 *             required:
 *               - name
 *               - price
 *               - tags
 *               - stars
 *               - imageUrl
 *               - origins
 *               - cookTime
 *     responses:
 *       200:
 *         description: Alimento creado exitosamente
 *       400:
 *         description: Error al crear el alimento
 */

/**
 * @swagger
 * /api/foods/search/{searchTerm}:
 *   get:
 *     tags: [Alimentos]
 *     summary: Buscar alimentos por término
 *     parameters:
 *       - in: path
 *         name: searchTerm
 *         required: true
 *         description: Término de búsqueda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de alimentos encontrados
 *       500:
 *         description: Error al buscar alimentos
 */

/**
 * @swagger
 * /api/foods/{foodId}:
 *   get:
 *     tags: [Alimentos]
 *     summary: Obtener información sobre un alimento por ID
 *     parameters:
 *       - in: path
 *         name: foodId
 *         required: true
 *         description: ID del alimento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del alimento
 *       404:
 *         description: Alimento no encontrado
 *   put:
 *     summary: Actualizar información de un alimento por ID
 *     tags: [Alimentos]
 *     parameters:
 *       - in: path
 *         name: foodId
 *         required: true
 *         description: ID del alimento
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Datos actualizados del alimento
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               favorite:
 *                 type: boolean
 *               stars:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               origins:
 *                 type: array
 *                 items:
 *                   type: string
 *               cookTime:
 *                 type: string
 *             required:
 *               - name
 *               - price
 *               - tags
 *               - stars
 *               - imageUrl
 *               - origins
 *               - cookTime
 *     responses:
 *       200:
 *         description: Alimento actualizado exitosamente
 *       400:
 *         description: Error al actualizar el alimento
 *       404:
 *         description: Alimento no encontrado
 *   delete:
 *     summary: Eliminar un alimento por ID
 *     tags: [Alimentos]
 *     parameters:
 *       - in: path
 *         name: foodId
 *         required: true
 *         description: ID del alimento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Alimento eliminado exitosamente
 *       400:
 *         description: Error al eliminar el alimento
 *       404:
 *         description: Alimento no encontrado
 */

export default router;
