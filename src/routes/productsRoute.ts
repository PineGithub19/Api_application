import express from 'express';
import productsController from '../controllers/productsController';

const router = express.Router();

router.get('/', productsController.getProductsByCondition);

export default router;
