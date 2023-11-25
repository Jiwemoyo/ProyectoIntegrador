/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Endpoints para la gestión de pedidos
 */
import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderStatus } from '../constants/order_status';
import { OrderModel } from '../models/order.model';
import auth from '../middlewares/auth.mid';

const router = Router();
router.use(auth);

router.post('/create', asyncHandler(async (req: any, res: any) => {
  const requestOrder = req.body;

  if (requestOrder.items.length <= 0) {
    res.status(HTTP_BAD_REQUEST).send('¡El carrito está vacío!');
    return;
  }

  await OrderModel.deleteOne({
    user: req.user.id,
    status: OrderStatus.NEW
  });

  const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
  await newOrder.save();
  res.send(newOrder);
}));

router.get('/', asyncHandler(async (req: any, res: any) => {
  const orders = await OrderModel.find();
  res.send(orders);
}));

router.get('/newOrderForCurrentUser', asyncHandler(async (req: any, res) => {
  const order = await getNewOrderForCurrentUser(req);
  if (order) res.send(order);
  else res.status(HTTP_BAD_REQUEST).send();
}));

router.get('/user/:userId', asyncHandler(async (req: any, res: any) => {
  const userId = req.params.userId;
  const orders = await OrderModel.find({ user: userId });
  res.send(orders);
}));

router.post('/pay', asyncHandler(async (req: any, res) => {
  const { paymentId } = req.body;
  const order = await getNewOrderForCurrentUser(req);
  if (!order) {
    res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
    return;
  }

  order.paymentId = paymentId;
  order.status = OrderStatus.PAYED;
  await order.save();

  res.send(order._id);
}));

router.get('/track/:id', asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id);
  res.send(order);
}));

export default router;

async function getNewOrderForCurrentUser(req: any) {
  if (!req.user || !req.user.id) {
    return null;
  }
  return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Endpoints para la gestión de pedidos en YAVIFOOD
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LatLng:
 *       type: object
 *       properties:
 *         lat:
 *           type: string
 *         lng:
 *           type: string
 *     OrderItem:
 *       type: object
 *       properties:
 *         food:
 *         price:
 *           type: number
 *         quantity:
 *           type: number
 */

/**
 * @swagger
 * /api/orders/create:
 *   post:
 *     tags: [Pedidos]
 *     summary: Crear un nuevo pedido
 *     description: Crea un nuevo pedido para el usuario autenticado.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Datos del nuevo pedido
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               addressLatLng:
 *               paymentId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *             required:
 *               - name
 *               - address
 *               - addressLatLng
 *               - paymentId
 *               - items
 *     responses:
 *       200:
 *         description: Pedido creado exitosamente
 *       400:
 *         description: El carrito está vacío
 */

/**
 * @swagger
 * /api/orders/:
 *   get:
 *     tags: [Pedidos]
 *     summary: Obtener todos los pedidos
 *     description: Obtiene todos los pedidos disponibles.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */

/**
 * @swagger
 * /api/orders/newOrderForCurrentUser:
 *   get:
 *     tags: [Pedidos]
 *     summary: Obtener el nuevo pedido del usuario actual
 *     description: Obtiene el nuevo pedido del usuario autenticado.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Nuevo pedido del usuario actual
 *       400:
 *         description: Pedido no encontrado
 */

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     tags: [Pedidos]
 *     summary: Obtener pedidos por ID de usuario
 *     description: Obtiene los pedidos asociados a un usuario por su ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de pedidos del usuario
 */

/**
 * @swagger
 * /api/orders/pay:
 *   post:
 *     tags: [Pedidos]
 *     summary: Pagar un pedido
 *     description: Paga un pedido pendiente de un usuario autenticado.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Datos de pago
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentId:
 *                 type: string
 *             required:
 *               - paymentId
 *     responses:
 *       200:
 *         description: Pedido pagado exitosamente
 *       400:
 *         description: Pedido no encontrado
 */

/**
 * @swagger
 * /api/orders/track/{id}:
 *   get:
 *     tags: [Pedidos]
 *     summary: Seguir un pedido por ID
 *     description: Obtiene información sobre un pedido por su ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del pedido
 *       404:
 *         description: Pedido no encontrado
 */
