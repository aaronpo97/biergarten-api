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
  data: ServerError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => void;
