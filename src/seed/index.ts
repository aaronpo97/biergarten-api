import { exit } from 'process';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';

import logger from '../util/logger';
import seedDatabase from './seedDatabase';

const startTime = performance.now();

seedDatabase().then(() => {
  const endTime = performance.now();

  logger.info('Database seeded.');
  logger.info(`That took ${formatDistanceStrict(endTime, startTime)}.`);
  exit(0);
});
