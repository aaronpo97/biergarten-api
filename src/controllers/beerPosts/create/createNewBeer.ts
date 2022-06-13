import { validate as checkIfValidUuid } from 'uuid';
import { CreateBeerRequestHandler } from '../types/RequestHandlers';
import ErrorResponse from '../../../util/response/ErrorResponse';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

import BeerPost from '../../../database/model/BeerPost';
import BreweryPost from '../../../database/model/BreweryPost';

/**
 * Business logic for creating a new brewery.
 *
 * The request body must contain a description, a name, an abv value, ibu value, the beer
 * type, as well as the brewery id. If those are not provided, the server will send status
 * code 400 with a message saying that not all required fields were given.
 *
 * In the case that the brewery id provided is not a valid UUID, the server will also
 * return a code 400 saying that the id is invalid.
 *
 * In the case that the brewery id is valid, but a brewery could not be found with the id,
 * the server will send code 404 saying that a brewery with the given id could not be
 * found, and therefore it could not create the beer resource.
 */

const createNewBeer: CreateBeerRequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { description, name, abv, ibu, breweryId, type } = req.body;

    if (!(name && description && abv && ibu && breweryId && type))
      throw new ServerError('Missing params in request body.', 400);

    const breweryIdIsValid = checkIfValidUuid(breweryId);

    if (!breweryIdIsValid) {
      throw new ServerError(
        'Cannot create a new beer resource as the given brewery id is invalid.',
        400,
      );
    }
    const newBeer = BeerPost.create();
    const brewery = await BreweryPost.findOneBy({ id: breweryId });

    if (!brewery) {
      throw new ServerError('Could not find the brewery for posted beer.', 404);
    }

    const { currentUser } = req;
    if (!currentUser) {
      throw new ServerError('Please reauthenticate your request.', 401);
    }

    newBeer.description = description;
    newBeer.name = name;
    newBeer.abv = abv;
    newBeer.ibu = ibu;
    newBeer.brewery = brewery;
    newBeer.type = type;
    newBeer.postedBy = currentUser;

    await newBeer.save();

    const newAccessToken = req.newAccessToken as string | undefined;

    const routeResponse = new SuccessResponse(
      'Created a new beer.',
      201,
      newBeer,
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

export default createNewBeer;
