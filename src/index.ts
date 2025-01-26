import express from 'express';
import cors from 'cors';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();
app.use(express.json());
app.use(cors());



import priceRouter from './routers/priceRouter';

const PORT = 3001;

app.get('/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.use('/api/v1', priceRouter);

app.use(errorMiddleware);


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
