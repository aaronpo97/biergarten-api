import { RequestHandler } from 'express';

import SuccessResponse from '../../../util/response/SuccessResponse';
import Brewery from '../../../database/model/Brewery';
import ErrorResponse from '../../../util/response/ErrorResponse';
import ServerError from '../../../util/error/ServerError';

/**
 *  Business logic for retrieving brewery data from the database and sending it to the client.
 * @type {RequestHandler}
 * @returns {Promise<void>}
 */
const getAllBreweries: RequestHandler = async (req, res, next) => {
  try {
    const allBreweries = await Brewery.find();
    const routeResponse = new SuccessResponse('Sending all breweries', 200, allBreweries);
    next(routeResponse);
  } catch (e) {
    if (e instanceof Error) {
      const errorResponse = new ErrorResponse(
        e.message,
        e instanceof ServerError ? e.status : 500,
        e.stack,
      );
      next(errorResponse);
    }
    next();
  }
};

export default getAllBreweries;
