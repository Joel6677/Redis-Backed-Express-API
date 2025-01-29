import { z } from 'zod';
import { QueryParamsSchema } from './utils/parseQueryParams';
import { Request } from 'express';

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


export interface VenueData {
	static: StaticData["data"]; // Only extract the `data` property
	dynamic: DynamicData["data"]; // Only extract the `data` property
}

export interface CustomRequest extends Request {
	venueData?: VenueData;
}



