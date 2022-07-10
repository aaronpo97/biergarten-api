import dotenv from 'dotenv';
import 'reflect-metadata';
import { exit, env } from 'process';

import AppDataSource from './database/AppDataSource';
import logger from './util/logger';
import expressApp from './expressApp';
import inProductionMode from './util/environment/inProductionMode';

dotenv.config();

const { PORT, BASE_URL } = env;

if (!(PORT && BASE_URL)) {
  throw new Error('Missing environment variables.');
}

const port = parseInt(PORT, 10);

expressApp.listen(port, () => {
  (async () => {
    try {
      if (!inProductionMode) {
        console.clear();
      }
      await AppDataSource.initialize();
      logger.info('Successfully started application.');
      logger.info('Connected to database.');
      logger.info(`Connected to ${BASE_URL}:${port}`);
    } catch (e) {
      if (e instanceof Error) {
        logger.error(`Could not initialize app.`);
        if (e.message) {
          logger.error(`Reason: ${e.message}.`);
        }
        logger.error(e.stack);
      }
      exit(1);
    }
  })();
});
