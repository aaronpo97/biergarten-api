/**
 * @summary Creates an express application and then configures
 * routing to different middleware depending on the route.
 */

import express from 'express';
import bodyParser from 'body-parser';

import beerCommentRoutes from './routes/beerCommentRoutes';
import beerImageRoutes from './routes/beerImageRoutes';
import beerPostRoutes from './routes/beerPostRoutes';
import breweryPostRoutes from './routes/breweryPostRoutes';
import breweryReviewRoutes from './routes/breweryReviewRoutes';
import teapotRoute from './routes/teapotRoute';
import userRoutes from './routes/userRoutes';

import { sendErrorResponse, sendSuccessResponse } from './middleware/response';

import inProductionMode from './util/environment/inProductionMode';
import requestLogger from './util/logger/utils/requestLogger';
import ServerError from './util/error/ServerError';
import beerTypeRoutes from './routes/beerTypeRoutes';

const app = express();

app.use(bodyParser.json());

if (inProductionMode) {
  app.use(requestLogger);
}

app.get('/api/teapot', teapotRoute);
app.use('/api/beers/:beerId/comments', beerCommentRoutes);
app.use('/api/beers/:beerId/images', beerImageRoutes);
app.use('/api/beers/types', beerTypeRoutes);
app.use('/api/beers/', beerPostRoutes);

app.use('/api/breweries/:breweryId/reviews', breweryReviewRoutes);
app.use('/api/breweries/', breweryPostRoutes);
app.use('/api/users/', userRoutes);

app.all('*', () => {
  throw new ServerError('404 Not Found', 404);
});

app.use(sendSuccessResponse);
app.use(sendErrorResponse);

export default app;
