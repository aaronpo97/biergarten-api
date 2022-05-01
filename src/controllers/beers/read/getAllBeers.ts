import { BeerRequestHandler } from '../@types/RequestHandlers';

import Beer from '../../../database/model/Beer';
import ErrorResponse from '../../../util/response/ErrorResponse';
import SuccessResponse from '../../../util/response/SuccessResponse';
import ServerError from '../../../util/error/ServerError';

/** Business logic for retrieving beers from the database and sending it to the client. */
const getAllBeers: BeerRequestHandler = async (req, res, next): Promise<void> => {
  try {
    const allBeers = await Beer.find();
    if (!allBeers.length) {
      throw new ServerError('No beer posts could be found in the database.', 404);
    }

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
