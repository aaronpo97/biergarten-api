// eslint-disable-next-line import/no-unresolved
import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';
import Beer from '../../../database/model/Beer';

import ErrorResponse from '../../../util/response/ErrorResponse';
import SuccessResponse from '../../../util/response/SuccessResponse';

/** Business logic for retrieving beers from the database and sending it to the client. */
const getAllBeers: RequestHandler<ParamsDictionary, Beer, null> = async (
  req,
  res,
  next,
): Promise<void> => {
  try {
    const allBeers = await Beer.find();

    const successResponse = new SuccessResponse('Sending all beers.', 200, allBeers);
    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      const errorResponse = new ErrorResponse(e.message, 500, e.stack);
      next(errorResponse);
    }
    next();
  }
};

export default getAllBeers;
