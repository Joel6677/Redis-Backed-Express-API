import express from 'express';
import { getDeliveryOrderPrice } from '../controllers/priceController';

const priceRouter = express.Router();

priceRouter.get('/api/v1/delivery-order-price/:venue_slug/:cart_value/:user_lat/:user_lon', getDeliveryOrderPrice);

export default priceRouter;
