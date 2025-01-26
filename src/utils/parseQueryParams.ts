import { z } from 'zod';
import { QueryParams } from '../types';


export const QueryParamsSchema = z.object({
	venueSlug: z.string(),
	cartValue: z.number().min(0),
	userLat: z.number().min(-90).max(90),
	userLong: z.number().min(-180).max(180),
});


export const parseQueryParams = (object: Record<string, string | undefined>): QueryParams => {
	return QueryParamsSchema.parse(object);
};
