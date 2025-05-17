import { Request, Response } from 'express';
import orderService from '../services/order.service';

class OrderController {
    async createOrder(req: Request, res: Response) {
        try {
            const {
                user_id,
                voucher_id,
                total_price,
                payment_type,
                items,
                email,
                name,
                phone,
                province,
                district,
                commune,
                address,
                housing_type,
            } = req.body;

            const orderId = await orderService.createOrder({
                user_id,
                voucher_id,
                total_price,
                payment_type,
                items,
                email,
                name,
                phone,
                province,
                district,
                commune,
                address,
                housing_type,
            });

            res.status(201).json({
                orderId,
                message: 'Order created successfully',
            });
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ message: 'Failed to create order' });
        }
    }

    async sendOrderConfirmationEmail(req: Request, res: Response) {
        try {
            const { orderId, email } = req.body;

            await orderService.sendEmail(
                email,
                `Order Confirmation`,
                `Your order with ID ${orderId} has been successfully placed.`,
            );

            res.status(200).json({
                message: 'Order confirmation email sent successfully',
            });
        } catch (error) {
            console.error('Error sending order confirmation email:', error);
            res.status(500).json({
                message: 'Failed to send order confirmation email',
            });
        }
    }
}

const orderController = new OrderController();
export default orderController;
