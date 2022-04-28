import dotenv from 'dotenv';

import 'reflect-metadata';

import AppDataSource from './database/AppDataSource';

import logger from './util/logger';
import app from './app';

dotenv.config();

const { NODE_ENV, PORT, BASE_URL } = process.env;

// if (!(NODE_ENV && PORT && BASE_URL)) throw new Error('Missing environment variables.');

const port = parseInt(PORT || '3000', 10);

app.listen(port, () => {
  logger.info('Loading...');
  AppDataSource.initialize()
    .then(() => {
      logger.info('Connected to database.');
      logger.info(`Connected to ${BASE_URL}:${port}`);
    })
    .catch((e) => {
      if (e instanceof Error) {
        logger.error(`Could not initialize app.\nReason:\n${e.message}\n${e.stack}`);
      }
    });
});
