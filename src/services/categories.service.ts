import { DBConfig as db } from '../config/dbconfig';

class CategoriesService {
    async getCategories() {
        try {
            const categories = await db
                .select('id', 'category')
                .from('categories');
            return categories;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
}

const categoriesService = new CategoriesService();
export default categoriesService;
