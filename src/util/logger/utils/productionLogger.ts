import format from 'date-fns/format';
import { existsSync, mkdirSync } from 'fs';
import pino, { destination } from 'pino';
import inProductionMode from '../../environment/inProductionMode';

const date = new Date(Date.now());
const dateString = format(date, 'LL-dd-y');
const timeString = format(date, 'HH:mm:ss');

const loggingDirectory = `${__dirname}/../../../../logs/${dateString}/${timeString}`;

if (!existsSync(loggingDirectory) && inProductionMode) {
  mkdirSync(loggingDirectory, { recursive: true });
}

const productionLogger = pino(
  inProductionMode ? destination(`${loggingDirectory}/logger.log`) : undefined,
);

export default productionLogger;
