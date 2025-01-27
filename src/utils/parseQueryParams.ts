import { z } from 'zod';
import { QueryParams } from '../types';

export const QueryParamsSchema = z.object({
	venue_slug: z.string(),
	cart_value: z.string(),
	user_lat: z.string(),
	user_lon: z.string(),
});

export const parseQueryParams = (object: unknown): QueryParams => {
	return QueryParamsSchema.parse(object);
};

