import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import beerRoutes from './routes/beerRoutes';
import breweryRoutes from './routes/breweryRoutes';
import { sendSuccessResponse, sendErrorResponse } from './middleware/response';

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/api/beers/', beerRoutes);
app.use('/api/breweries/', breweryRoutes);

app.use(sendSuccessResponse);
app.use(sendErrorResponse);

export default app;
