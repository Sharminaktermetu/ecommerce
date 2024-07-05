import { Router } from 'express';
import { OrderControllers } from './order.controller';
  // Adjust the path as necessary

const router = Router();




router.post('/orders', OrderControllers.createOrder);
router.get('/orders', OrderControllers.fetchOrders)
export const OrderRoutes = router;
