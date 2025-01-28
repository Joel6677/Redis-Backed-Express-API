import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';


const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
	if (error instanceof z.ZodError) {
		console.error('zod error:', error);
		res.status(400).send({ error: error.issues });
	} else if (error instanceof Error) {
		if (error.message === "Delivery not possible: Distance too long") {
			console.log('Handling distance too long error');
			res.status(400).send({ error: error.message });
		} else {
			console.error('Internal error', error);
			res.status(500).send({ error: 'Internal Server Error' });
		}
	} else {
		console.error('Unknown error', error);
		res.status(500).send({ error: 'Unknown error' });
		next(error);
	}
};


export default errorMiddleware;
