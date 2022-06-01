import dotenv from 'dotenv';
import 'reflect-metadata';
import { exit, env } from 'process';

import AppDataSource from './database/AppDataSource';
import logger from './util/logger';
import app from './app';

dotenv.config();

const { PORT, BASE_URL } = env;

if (!(PORT && BASE_URL)) {
  throw new Error('Missing environment variables.');
}

const port = parseInt(PORT, 10);

app.listen(port, () => {
  (async () => {
    try {
      await AppDataSource.initialize();
      logger.info('Connected to database.');
      logger.info(`Connected to ${BASE_URL}:${port}`);
    } catch (e) {
      if (e instanceof Error) {
        logger.error(`Could not initialize app.\nReason:\n${e.message}\n${e.stack}`);
      }
      exit(1);
    }
  })();
});
