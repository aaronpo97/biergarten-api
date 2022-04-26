import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import beerRoutes from './routes/beerRoutes';
import breweryRoutes from './routes/breweryRoutes';

import 'reflect-metadata';
import AppDataSource from './database/AppDataSource';

import logger from './util/logger';
import SuccessResponse from './util/response/SuccessResponse';
import ErrorResponse from './util/response/ErrorResponse';
import ServerError from './util/error/ServerError';

dotenv.config();

const { NODE_ENV, PORT, BASE_URL } = process.env;

if (!(NODE_ENV && PORT && BASE_URL)) {
  throw new Error('Missing environment variables.');
}

const app = express();
const port = parseInt(PORT as string, 10);
const inProductionMode: boolean = NODE_ENV === 'production';

app.use(bodyParser.json());
app.use('/api/beers/', beerRoutes);
app.use('/api/breweries/', breweryRoutes);

try {
  app.listen(port, async () => {
    logger.info('Loading...');
    await AppDataSource.initialize();
    logger.info('Connected to database.');
    logger.info(`Connected to ${BASE_URL}:${port}`);
  });
} catch (e) {
  if (e instanceof Error) {
    logger.error(`Could not initialize app.\nReason:\n${e.message}\n${e.stack}`);
  }

  process.exit(1);
}

app.use((data: SuccessResponse, req: Request, res: Response, next: NextFunction) => {
  const { status, success } = data;
  if (success) {
    res.status(status).json(data);
  } else {
    next(data);
  }
});

// eslint-disable-next-line no-unused-vars
app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  const { status = 500, message = 'Oh no, something went wrong.', stack } = err;
  res
    .status(status)
    .json(new ErrorResponse(message, status, !inProductionMode ? stack : undefined));
});
