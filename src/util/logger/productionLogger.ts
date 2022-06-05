import { existsSync, mkdirSync } from 'fs';
import pino, { destination } from 'pino';

const date = new Date(Date.now());

const dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

const loggingDirectory = `${__dirname}/../../logs/${dateString}/${timeString}`;

if (!existsSync(loggingDirectory)) {
  mkdirSync(loggingDirectory, { recursive: true });
}

const productionLogger = pino(destination(`${loggingDirectory}/logger.log`));

export default productionLogger;
