import { CreateBreweryRequestHandler } from '../types/RequestHandlers';

import Brewery from '../../../database/model/Brewery';
import ErrorResponse from '../../../util/response/ErrorResponse';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

/** Business logic for creating a new brewery. */
const createNewBrewery: CreateBreweryRequestHandler = async (
  req,
  res,
  next,
): Promise<void> => {
  try {
    const { description, name, location } = req.body;

    if (!(name && description && location)) {
      throw new ServerError('Missing params in request body.', 400);
    }
    const newBrewery = new Brewery()

    newBrewery.description = description;
    newBrewery.name = name;
    newBrewery.location = location;

    await newBrewery.save();

    const routeResponse = new SuccessResponse('Created a new brewery.', 201, newBrewery);
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

export default createNewBrewery;
