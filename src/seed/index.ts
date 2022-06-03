import { exit } from 'process';
import logger from '../util/logger';
import seedDB from './seed';

/** Invokes the seedDB function, then aborts the program. */
seedDB().then(() => {
  logger.info('Database initialized and seeded.');
  exit(0);
});
