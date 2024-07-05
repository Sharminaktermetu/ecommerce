import { Router } from 'express';
import { OrderControllers } from './order.controller';
  // Adjust the path as necessary

const router = Router();


router.post('/', OrderControllers.createOrder);

export const OrderRoutes = router;
