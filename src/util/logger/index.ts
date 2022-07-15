import productionLogger from './utils/productionLogger';
import devLogger from './utils/devLogger';
import inProductionMode from '../environment/inProductionMode';

/** An instance of pino logger. */
const logger = inProductionMode ? productionLogger : devLogger;

export default logger;
