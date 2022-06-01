/**
 * @summary Creates an express application and then configures
 * routing to different middleware depending on the route.
 */

import express from 'express';
import bodyParser from 'body-parser';

import beerRoutes from './routes/beerRoutes';
import breweryRoutes from './routes/breweryRoutes';
import teapotRoute from './routes/teapotRoute';

import { sendErrorResponse, sendSuccessResponse } from './middleware/response';
import userRoutes from './routes/userRoutes';
import beerCommentRoutes from './routes/beerCommentRoutes';
import beerImageRoutes from './routes/beerImageRoutes';
import ServerError from './util/error/ServerError';

const app = express();

app.use(bodyParser.json());

app.get('/api/teapot', teapotRoute);
app.use('/api/beers/:beerId/comments', beerCommentRoutes);
app.use('/api/beers/:beerId/images', beerImageRoutes);
app.use('/api/beers/', beerRoutes);

app.use('/api/breweries/', breweryRoutes);
app.use('/api/users/', userRoutes);

app.all('*', () => {
  throw new ServerError('404 Not Found', 404);
});

app.use(sendSuccessResponse);
app.use(sendErrorResponse);

export default app;
