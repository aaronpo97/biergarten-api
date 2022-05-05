/* eslint-disable no-unused-vars */

import process from 'process';
import ErrorResponse from '../../util/response/ErrorResponse';
import 'dotenv/config';
import { ErrorResponseT, SuccessResponseT } from './types';

const { NODE_ENV } = process.env;

const inProductionMode: boolean = NODE_ENV === 'production';

export const sendSuccessResponse: SuccessResponseT = (data, req, res, next) => {
  const { status, success } = data;
  if (success) {
    res.status(status).json(data);
  } else {
    next(data);
  }
};

export const sendErrorResponse: ErrorResponseT = (err, req, res, next) => {
  const { status = 500, message = 'Oh no, something went wrong.', stack } = err;
  res
    .status(status)
    .json(new ErrorResponse(message, status, !inProductionMode ? stack : undefined));
};
