import express from 'express';
import categoriesRoute from './routes/categoriesRoute';
import productsRoute from './routes/productsRoute';
import orderRoute from './routes/orderRoute';

const app = express();

app.use(express.json());

app.use('/api/categories', categoriesRoute);
app.use('/api/products', productsRoute);
app.use('/api/orders', orderRoute);

export default app;
