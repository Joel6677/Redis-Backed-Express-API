import { Request, Response, NextFunction } from 'express';
import { QueryParamsSchema } from '../utils/parseQueryParams';

export const QueryParamParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		QueryParamsSchema.parse(req.query);
		console.log(req.body);
		next();
	} catch (error: unknown) {
		next(error);
	}
};
