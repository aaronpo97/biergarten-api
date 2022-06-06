import expressPinoLogger from 'express-pino-logger';
import logger from '..';

const requestLogger = expressPinoLogger({
  level: 'info',
  enabled: true,
  logger,
});

export default requestLogger;
