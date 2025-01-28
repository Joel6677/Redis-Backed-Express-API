import { z } from 'zod';
import { QueryParamsSchema } from './utils/parseQueryParams';

export interface DistanceRanges {

	min: number
	max: number
	a: number
	b: number
	flag: string | null
};


export type QueryParams = z.infer<typeof QueryParamsSchema>;


export interface VenueLocation {
	coordinates: [number, number]
}

export interface StaticData {
	data: {
		venue_raw: {
			location: VenueLocation;
		}
	};
	status: number
}

export interface DistanceRange {
	min: number;
	max: number;
	a: number;
	b: number;
	flag: string | null;
}

export interface DeliveryPricing {
	base_price: number;
	distance_ranges: DistanceRange[];
}

export interface DynamicData {
	data: {
		venue_raw: {
			delivery_specs: {
				order_minimum_no_surcharge: number;
				delivery_pricing: DeliveryPricing;
			};
		}
	}
	status: number
}



