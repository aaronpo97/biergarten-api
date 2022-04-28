/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express-serve-static-core';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

export type SuccessResponseT = (
  data: SuccessResponse,
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export type ErrorResponseT = (
  data: ServerError,
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
