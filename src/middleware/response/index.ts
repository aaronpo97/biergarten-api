import ErrorResponse from '../../util/response/ErrorResponse';
import 'dotenv/config';
import { ErrorResponseT, SuccessResponseT } from './types';
import logger from '../../util/logger';
import inProductionMode from '../../util/environment/inProductionMode';

/**
 * Last middleware for express application upon a success ful request. Sends an instance
 * of SuccessResponse.
 */
export const sendSuccessResponse: SuccessResponseT = (data, req, res, next) => {
  const { status, success } = data;
  if (success) {
    res.status(status).json(data);
  } else {
    next(data);
  }
};

/**
 * Last middleware for express application upon a unsuccessful request. Sends an instance
 * of ErrorResponse.
 */
/* eslint-disable-next-line no-unused-vars */
export const sendErrorResponse: ErrorResponseT = (err, req, res, next) => {
  logger.error(err);

  if ('type' in err) {
    const { type } = err;
    const message = `The request ${type} is invalid.`;
    const response = new ErrorResponse(message, 400, err.error?.details);
    res.status(400).json(response);
    return;
  }

  const { message } = err;
  const status = 'status' in err ? err.status : 500;
  const stack = inProductionMode ? err.stack : undefined;
  const response = new ErrorResponse(message, status, stack);
  res.status(status).json(response);
};
