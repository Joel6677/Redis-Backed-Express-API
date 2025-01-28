import axios from 'axios';

import { NextFunction, Request, Response } from 'express';
import { calculateTotalPrice } from '../utils/calculateTotalPrice';
import calculateDistanceFee from '../utils/calculateDistanceFee';
import calculateDistance from '../utils/calculateDistance';
import { calculateSmallOrderSurcharge } from '../utils/calculateSmallOrderSurcharge';
import { StaticData, DynamicData, QueryParams } from '../types';


export const getDeliveryOrderPrice = async (req: Request<unknown, unknown, unknown, QueryParams>, res: Response, next: NextFunction) => {
	try {
		const { venue_slug, cart_value, user_lat, user_lon } = req.query;

		const staticData: StaticData = await axios.get(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue_slug}/static`);
		const dynamicData: DynamicData = await axios.get(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue_slug}/dynamic`);

		const venueCoordinates = staticData.data.venue_raw.location.coordinates;
		const orderMinimumNoSurcharge = dynamicData.data.venue_raw.delivery_specs.order_minimum_no_surcharge;
		const basePrice = dynamicData.data.venue_raw.delivery_specs.delivery_pricing.base_price;
		const distanceRanges = dynamicData.data.venue_raw.delivery_specs.delivery_pricing.distance_ranges;

		const venueLat = venueCoordinates[1];
		const venueLong = venueCoordinates[0];

		const smallOrderSurcharge = calculateSmallOrderSurcharge(orderMinimumNoSurcharge, Number(cart_value));

		const distance = calculateDistance(Number(user_lat), Number(user_lon), venueLat, venueLong);

		const deliveryFee = calculateDistanceFee(distance, basePrice, distanceRanges);

		const totalPrice = calculateTotalPrice(Number(cart_value), smallOrderSurcharge, deliveryFee);

		const price = {
			total_price: totalPrice,
			small_order_surcharge: smallOrderSurcharge,
			cart_value: cart_value,
			delivery: {
				fee: deliveryFee,
				distance: distance
			}
		};

		console.log('delivery order price:', price);

		res.status(200).json(price);

	} catch (error) {
		console.error('Error calculating delivery order price:', error);
		return next(error);
	}
};

