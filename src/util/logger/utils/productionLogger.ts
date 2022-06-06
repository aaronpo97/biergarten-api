import { format } from 'date-fns';
import { existsSync, mkdirSync } from 'fs';
import pino, { destination } from 'pino';

const date = new Date(Date.now());

const dateString = format(date, 'LL-dd-y');
const timeString = format(date, 'HH:mm:ss');

const loggingDirectory = `${__dirname}/../../../../logs/${dateString}/${timeString}`;

if (!existsSync(loggingDirectory)) {
  mkdirSync(loggingDirectory, { recursive: true });
}

const productionLogger = pino(destination(`${loggingDirectory}/logger.log`));

export default productionLogger;
