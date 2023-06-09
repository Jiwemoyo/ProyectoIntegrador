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
