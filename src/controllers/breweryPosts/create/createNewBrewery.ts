import { CreateBreweryRequestHandler } from '../types/RequestHandlers';

import BreweryPost from '../../../database/model/BreweryPost';

import ErrorResponse from '../../../util/response/ErrorResponse';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

/** Business logic for creating a new brewery. */
const createNewBrewery: CreateBreweryRequestHandler = async (req, res, next) => {
  try {
    const { description, name, location, phoneNumber } = req.body;

    if (!(name && description && location && phoneNumber)) {
      throw new ServerError('Missing params in request body.', 400);
    }

    const { currentUser } = req;
    if (!currentUser) {
      throw new ServerError('Please reauthenticate your request.', 401);
    }

    const newBrewery = new BreweryPost();

    newBrewery.description = description;
    newBrewery.name = name;
    newBrewery.location = location;
    newBrewery.postedBy = currentUser;
    newBrewery.createdAt = new Date(Date.now());
    newBrewery.phoneNumber = phoneNumber;

    await newBrewery.save();

    const { newAccessToken } = req;

    const routeResponse = new SuccessResponse(
      'Created a new brewery.',
      201,
      newBrewery,
      newAccessToken,
    );
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
