/**
 * @summary
 * Creates an express application and then configures
 * routing to different middleware depending on the route.
 */

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import beerRoutes from './routes/beerRoutes';
import breweryRoutes from './routes/breweryRoutes';
import teapotRoute from './routes/teapotRoute';

import { sendErrorResponse, sendSuccessResponse } from './middleware/response';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/teapot', teapotRoute);
app.get('/api/teapot', teapotRoute);
app.use('/api/beers/', beerRoutes);
app.use('/api/breweries/', breweryRoutes);
app.use('/api/users/', userRoutes);

app.use(sendSuccessResponse);
app.use(sendErrorResponse);

export default app;
