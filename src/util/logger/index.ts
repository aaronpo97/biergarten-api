import productionLogger from './utils/productionLogger';
import devLogger from './utils/devLogger';
import inProductionMode from '../environment/inProductionMode';
import inTestingMode from '../environment/inTestingMode';

/** An instance of pino logger. */
const logger = inProductionMode || inTestingMode ? productionLogger : devLogger;

export default logger;
