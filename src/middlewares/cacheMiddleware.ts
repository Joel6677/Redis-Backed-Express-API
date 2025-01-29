import axios from 'axios';
import { Response, NextFunction } from 'express';
import { AxiosError } from 'axios';
import { DynamicData, QueryParams, StaticData, VenueData } from '../types';
import { redisClient } from '../redis/redis-client';
import { CustomRequest } from '../types';

//export const venueSlugMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//	const { venue_slug } = req.query as QueryParams;
//
//	try {
//
//
//		const staticData: StaticData = await axios.get(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue_slug}/static`);
//		if (!staticData || staticData.status !== 200) {
//			console.error('Error fetching static data');
//			res.status(400).json({ error: 'Error fetching static data' });
//			return;
//		}
//		const dynamicData: DynamicData = await axios.get(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue_slug}/static`);
//		if (!dynamicData || dynamicData.status !== 200) {
//			console.error('Error fetching dynamic data');
//			res.status(400).json({ error: 'Error fetching dynamic data' });
//			return;
//		}
//		next();
//	} catch (error) {
//
//		if (error instanceof AxiosError) {
//			if (error.response && error.response.status === 404) {
//				console.error('Request failed with status code 404');
//				res.status(400).json({ error: error.message });
//				return;
//			}
//		}
//		return (next());
//	}
//};
//

export const cacheVenueDataMiddleware = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {

	const { venue_slug } = req.query as QueryParams;


	// Ensure Redis is connected only once
	if (!redisClient.isOpen) {
		await redisClient.connect();
	}


	try {
		// Check if data is in cache first (static and dynamic data)
		const cacheKey = `venue:${venue_slug}`;
		const cachedData = await redisClient.get(cacheKey);

		if (cachedData) {
			// If cached data exists, send it directly
			// TODO: check the type of parsedData
			console.log('Serving from cache');
			const parsedData = JSON.parse(cachedData) as VenueData;
			console.log('parsedData:', parsedData);
			req.venueData = parsedData;
			return next();
		}

		// Fetch data from Home Assignment API if not in cache
		const staticData: StaticData = await axios.get(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue_slug}/static`);
		const dynamicData: DynamicData = await axios.get(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue_slug}/dynamic`);

		if (!staticData || staticData.status !== 200) {
			console.error('Error fetching static data');
			res.status(400).json({ error: 'Error fetching static data' });
			return;
		}

		if (!dynamicData || dynamicData.status !== 200) {
			console.error('Error fetching dynamic data');
			res.status(400).json({ error: 'Error fetching dynamic data' });
			return;
		}


		// Combine both static and dynamic data
		const venueData: VenueData = {
			static: staticData.data,
			dynamic: dynamicData.data,
		};


		// Cache the combined data in Redis for future use
		await redisClient.set(cacheKey, JSON.stringify(venueData), {
			EX: 3600, // Expiration in seconds (e.g., 1 hour)
		});
		// Add data to request object to pass it to the next middleware or controller
		req.venueData = venueData;

		next();

	} catch (error) {

		console.error('error with cacheMiddleware:', error);

		if (error instanceof AxiosError) {
			if (error.response && error.response.status === 404) {
				console.error('Request failed with status code 404');
				res.status(400).json({ error: error.message });
				return;
			}
		}
		return (next());
	}
};
