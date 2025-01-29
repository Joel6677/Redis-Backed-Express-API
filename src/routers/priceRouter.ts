import express from 'express';
import { getDeliveryOrderPrice } from '../controllers/priceController';
import { QueryParamParser } from '../middlewares/QueryParamParser';
import { cacheVenueDataMiddleware } from '../middlewares/cacheMiddleware';

const priceRouter = express.Router();

priceRouter.get('/delivery-order-price', QueryParamParser, cacheVenueDataMiddleware, getDeliveryOrderPrice);


export default priceRouter;
