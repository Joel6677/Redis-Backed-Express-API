import axios from 'axios';
import { Request, Response } from 'express';
import { calculateTotalPrice } from '../utils/calculateTotalPrice';
import calculateDistanceFee from '../utils/calculateDistanceFee';
import calculateDistance from '../utils/calculateDistance';
import { calculateSmallOrderSurcharge } from '../utils/calculateSmallOrderSurcharge';
import { QueryParams, StaticData, DynamicData } from '../types';
import { parseQueryParams } from '../utils/parseQueryParams';


export const getDeliveryOrderPrice = async (req: Request, res: Response) => {

	const queryParams = req.query as Record<string, string | undefined>;
	const validatedParams = parseQueryParams(queryParams);

	const { venueSlug, cartValue, userLat, userLong }: QueryParams = validatedParams;

	const staticData: StaticData = await axios.get(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/static`);
	const dynamicData: DynamicData = await axios.get(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/dynamic`);

	const venueCoordinates = staticData.venue_raw.location.coordinates;
	const orderMinimumNoSurcharge = dynamicData.venue_raw.delivery_specs.order_minimum_no_surcharge;
	const basePrice = dynamicData.venue_raw.delivery_specs.delivery_pricing.base_price;
	const distanceRanges = dynamicData.venue_raw.delivery_specs.delivery_pricing.distance_ranges;


	const venueLat = venueCoordinates[0];
	const venueLong = venueCoordinates[1];


	const smallOrderSurcharge = calculateSmallOrderSurcharge(orderMinimumNoSurcharge, cartValue);
	const distance = calculateDistance(userLat, userLong, venueLat, venueLong);
	const deliveryFee = calculateDistanceFee(distance, basePrice, distanceRanges);

	const totalPrice = calculateTotalPrice(cartValue, smallOrderSurcharge, deliveryFee);


	const price = {
		"total_price": totalPrice,
		"small_order_surcharge": smallOrderSurcharge,
		"cart_value": cartValue,
		"delivery": {
			"fee": deliveryFee,
			"distance": distance
		}
	};

	res.status(200).json(price);
};

