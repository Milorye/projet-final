import { Router } from 'express';
import { createProduct, getProductById, getProductBySlug, listProducts } from '../controllers/productController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);
router.post('/', authenticate, requireAdmin, createProduct);

export default router;
