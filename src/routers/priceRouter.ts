import express from 'express';
import priceController from './controllers/priceController';

const router = express.Router();

router.get('/api/v1/delivery-order-price/:venue_slug/:cart_value/:user_lat/:user_lon', priceController.getDeliveryOrderPrice);
