import productionLogger from './utils/productionLogger';
import devLogger from './utils/devLogger';
import inProductionMode from '../environment/inProductionMode';

export default inProductionMode ? productionLogger : devLogger;
