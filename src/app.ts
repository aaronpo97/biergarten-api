/**
 * @summary Creates an express application and then configures
 * routing to different middleware depending on the route.
 */

import express from 'express';
import bodyParser from 'body-parser';

import { env } from 'process';

import beerRoutes from './routes/beerRoutes';
import breweryRoutes from './routes/breweryRoutes';
import teapotRoute from './routes/teapotRoute';

import { sendErrorResponse, sendSuccessResponse } from './middleware/response';
import userRoutes from './routes/userRoutes';
import beerCommentRoutes from './routes/beerCommentRoutes';
import beerImageRoutes from './routes/beerImageRoutes';
import breweryReviewRoutes from './routes/breweryReviewRoutes';

import ServerError from './util/error/ServerError';
import requestLogger from './util/logger/utils/requestLogger';

const app = express();

app.use(bodyParser.json());

if (env.NODE_ENV === 'production') {
  app.use(requestLogger);
}

app.get('/api/teapot', teapotRoute);
app.use('/api/beers/:beerId/comments', beerCommentRoutes);
app.use('/api/beers/:beerId/images', beerImageRoutes);
app.use('/api/beers/', beerRoutes);

app.use('/api/breweries/:breweryId/reviews', breweryReviewRoutes);
app.use('/api/breweries/', breweryRoutes);
app.use('/api/users/', userRoutes);

app.all('*', () => {
  throw new ServerError('404 Not Found', 404);
});

app.use(sendSuccessResponse);
app.use(sendErrorResponse);

export default app;
