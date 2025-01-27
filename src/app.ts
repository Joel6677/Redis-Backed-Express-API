import express from 'express';
import cors from 'cors';
import errorMiddleware from './middlewares/errorMiddleware';
import priceRouter from './routers/priceRouter';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', priceRouter);

app.get('/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.use(errorMiddleware);


export default app;
