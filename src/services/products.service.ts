import { DBConfig as db } from '../config/dbconfig';

type ProductFilters = {
    category?: string;
    search?: string;
    page?: number;
    order?: string;
};

class ProductsService {
    async getProductsByCondition({
        category,
        search,
        page,
        order,
    }: ProductFilters) {
        const pageSize = 10;
        const offset = (page ? page - 1 : 0) * pageSize;
        const orderBy = order === 'price_asc' ? 'asc' : 'desc';

        try {
            let total_pages = 1;
            let query = db
                .select(
                    'products.id',
                    'products.name',
                    'products.price',
                    'products.cate_id',
                    'products.brand_id',
                    'products.thumbnail',
                )
                .from('products');

            if (category) {
                query = query
                    .rightJoin(
                        'categories',
                        'products.cate_id',
                        'categories.id',
                    )
                    .where('categories.category', category);
            }

            if (search) {
                query = query.where('products.name', 'like', `%${search}%`);

                const totalCount = await db('products')
                    .where('products.name', 'like', `%${search}%`)
                    .count<{ count: string | number }[]>('* as count')
                    .first();

                const countValue =
                    totalCount && typeof totalCount.count !== 'undefined'
                        ? Number(totalCount.count)
                        : 0;

                total_pages = Math.ceil(countValue / pageSize);
            } else {
                const totalCount = await db('products')
                    .count<{ count: string | number }[]>('* as count')
                    .first();

                const countValue =
                    totalCount && typeof totalCount.count !== 'undefined'
                        ? Number(totalCount.count)
                        : 0;

                total_pages = Math.ceil(countValue / pageSize);
            }

            if (order) {
                query = query.orderBy('products.price', orderBy);
            }

            query = query.limit(pageSize).offset(offset);

            const response = {
                page: page || 1,
                total_pages: total_pages,
                results: await query,
            };

            return response;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
}

const productsService = new ProductsService();
export default productsService;
