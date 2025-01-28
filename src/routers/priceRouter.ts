import express from 'express';
import { getDeliveryOrderPrice } from '../controllers/priceController';
import { QueryParamParser } from '../middlewares/QueryParamParser';
import { venueSlugMiddleware } from '../middlewares/venueSlugMiddleware';

const priceRouter = express.Router();

priceRouter.get('/delivery-order-price', QueryParamParser, venueSlugMiddleware, getDeliveryOrderPrice);


export default priceRouter;
