import { env } from 'process';

import productionLogger from './utils/productionLogger';
import devLogger from './utils/devLogger';

export default env.NODE_ENV === 'production' ? productionLogger : devLogger;
