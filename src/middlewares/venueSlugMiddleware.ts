import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';
import { DynamicData, QueryParams, StaticData } from '../types';


export const venueSlugMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const { venue_slug } = req.query as QueryParams;

	try {
		const staticData: StaticData = await axios.get(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue_slug}/static`);
		if (!staticData || staticData.status !== 200) {
			console.error('Error fetching static data');
			res.status(400).json({ error: 'Error fetching static data' });
			return;
		}
		const dynamicData: DynamicData = await axios.get(`https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue_slug}/static`);
		if (!dynamicData || dynamicData.status !== 200) {
			console.error('Error fetching dynamic data');
			res.status(400).json({ error: 'Error fetching dynamic data' });
			return;
		}
		next();
	} catch (error) {

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

