/**
 * @summary Creates an express application and then configures
 * routing to different middleware depending on the route.
 */

import express from 'express';
import bodyParser from 'body-parser';

import { sendErrorResponse, sendSuccessResponse } from './middleware/response';

import beerCommentRoutes from './routes/beerCommentRoutes';
import beerImageRoutes from './routes/beerImageRoutes';
import beerPostRoutes from './routes/beerPostRoutes';
import beerTypeRoutes from './routes/beerTypeRoutes';
import breweryPostRoutes from './routes/breweryPostRoutes';
import breweryReviewRoutes from './routes/breweryReviewRoutes';
import teapotRoute from './routes/teapotRoute';
import userRoutes from './routes/userRoutes';

import inProductionMode from './util/environment/inProductionMode';
import requestLogger from './util/logger/utils/requestLogger';
import ServerError from './util/error/ServerError';

/** An express application. */
const expressApp = express();

expressApp.use(bodyParser.json());

if (inProductionMode) {
  expressApp.use(requestLogger);
}

expressApp.get('/api/teapot', teapotRoute);
expressApp.use('/api/beers/:beerId/comments', beerCommentRoutes);
expressApp.use('/api/beers/:beerId/images', beerImageRoutes);
expressApp.use('/api/beers/types', beerTypeRoutes);
expressApp.use('/api/beers/', beerPostRoutes);

expressApp.use('/api/breweries/:breweryId/reviews', breweryReviewRoutes);
expressApp.use('/api/breweries/', breweryPostRoutes);
expressApp.use('/api/users/', userRoutes);

expressApp.all('*', () => {
  throw new ServerError('404 Not Found', 404);
});

expressApp.use(sendSuccessResponse);
expressApp.use(sendErrorResponse);

export default expressApp;
