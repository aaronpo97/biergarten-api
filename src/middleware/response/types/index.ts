import { ExpressJoiError } from 'express-joi-validation';
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express-serve-static-core';
import ServerError from '../../../util/error/ServerError';
import ErrorResponse from '../../../util/response/ErrorResponse';
import SuccessResponse from '../../../util/response/SuccessResponse';

export type SuccessResponseT = (
  data: SuccessResponse<unknown>,
  req: Request,
  res: Response<SuccessResponse<unknown>>,
  next: NextFunction,
) => void;

export type ErrorResponseT = (
  data: Error | ServerError | ExpressJoiError,
  req: Request,
  res: Response<unknown>,
  next: NextFunction,
) => void;
