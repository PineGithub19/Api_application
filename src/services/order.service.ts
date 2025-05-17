import { DBConfig } from '../config/dbconfig';
import nodemailer from 'nodemailer';

import * as dotenv from 'dotenv';
dotenv.config();

interface Product {
    product_id: number;
    quantity: number;
}

interface Order {
    user_id: number;
    items: Product[];
    total_price: number;
    name: string;
    email: string;
    phone: string;
    province: string;
    district: string;
    commune: string;
    address: string;
    housing_type: string;
    payment_type: string;
    voucher_id: number;
}

class OrderService {
    async createOrder(order: Order) {
        const {
            user_id,
            items,
            total_price,
            name,
            email,
            phone,
            province,
            district,
            commune,
            address,
            housing_type,
            payment_type,
            voucher_id,
        } = order;

        try {
            const [order_id] = await DBConfig.insert({
                user_id,
                voucher_id,
                total_price,
                payment_type,
                created_at: new Date(),
            }).into('orders');

            for (const item of items) {
                const productPriceWithDiscount = await DBConfig.select(
                    'products.price',
                    'product_discounts.discount',
                )
                    .from('products')
                    .leftJoin(
                        'product_attributes',
                        'products.id',
                        'product_attributes.product_id',
                    )
                    .leftJoin(
                        'product_discounts',
                        'products.id',
                        'product_discounts.product_id',
                    )
                    .where('products.id', item.product_id)
                    .first();

                const { price, discount } = productPriceWithDiscount || {
                    price: 0,
                    discount: 0,
                };

                const [productAttributeId] = await DBConfig.select('id')
                    .from('product_attributes')
                    .where('product_id', item.product_id);

                await DBConfig.insert({
                    order_id,
                    product_attribute_id: productAttributeId.id,
                    quantity: item.quantity,
                    price: price - (price * discount) / 100,
                }).into('order_items');
            }

            await DBConfig.insert({
                order_id,
                email,
                recipient_name: name,
                phone,
                province,
                district,
                commune,
                address,
                housing_type,
            }).into('order_address');

            return order_id;
        } catch (error) {
            console.error('Error creating order:', error);
            throw new Error('Failed to create order');
        }
    }

    async sendEmail(to: string, subject: string, body: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            text: body,
        });
    }
}

const orderService = new OrderService();
export default orderService;
