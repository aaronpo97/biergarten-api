import { env } from 'process';

import productionLogger from './productionLogger';
import devLogger from './devLogger';

const logger = env.NODE_ENV === 'production' ? productionLogger : devLogger;

export default logger;
