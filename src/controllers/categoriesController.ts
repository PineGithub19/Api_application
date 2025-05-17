import { Request, Response } from 'express';
import categoriesService from '../services/categories.service';

class CategoriesController {
    async getCategories(req: Request, res: Response) {
        try {
            const categories = await categoriesService.getCategories();
            res.status(200).json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

const categoriesController = new CategoriesController();
export default categoriesController;
