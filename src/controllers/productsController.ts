import { Request, Response } from 'express';
import productsService from '../services/products.service';

class ProductsController {
    async getProductsByCondition(req: Request, res: Response) {
        const category = req.query.category as string;
        const search = req.query.search as string;
        const page = req.query.page ? Number(req.query.page) : 1;
        const order = req.query.order as string;

        try {
            const products = await productsService.getProductsByCondition({
                category,
                search,
                page,
                order,
            });
            if (products.results.length === 0) {
                res.status(404).json({
                    page: products.page || 1,
                    total_pages: products.total_pages || 1,
                    results: [],
                });
            }
            res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

const productsController = new ProductsController();
export default productsController;
