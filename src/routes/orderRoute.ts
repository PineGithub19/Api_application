import express from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

router.post('/', orderController.createOrder);
router.post('/email-confirmation', orderController.sendOrderConfirmationEmail);

export default router;
