import express from 'express';
import { getDeliveryOrderPrice } from '../controllers/priceController';
import { QueryParamParser } from '../middlewares/QueryParamParser';

const priceRouter = express.Router();

priceRouter.get('/delivery-order-price', QueryParamParser, getDeliveryOrderPrice);

export default priceRouter;
