import { Router } from 'express';
import { listAllOrders, listMyOrders, placeOrder } from '../controllers/orderController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);
router.post('/', placeOrder);
router.get('/my-orders', listMyOrders);
router.get('/', requireAdmin, listAllOrders);

export default router;
