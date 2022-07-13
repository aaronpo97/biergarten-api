import { validate as checkIfValidUuid } from 'uuid';
import { CreateBeerRequestHandler } from '../types/RequestHandlers';
import ErrorResponse from '../../../util/response/ErrorResponse';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

import BeerPost from '../../../database/model/BeerPost';
import BreweryPost from '../../../database/model/BreweryPost';
import BeerType from '../../../database/model/BeerType';

/**
 * Business logic for creating a new brewery.
 *
 * The request body must contain a description, a name, an abv value, ibu value, the beer
 * type, as well as the brewery id.
 *
 * @throws ServerError with status 400 if not all parameters were given in the request body.
 * @throws ServerError with status 400 if the provided brewery id is not valid.
 * @throws ServerError with status 404 if a brewery_post with the client provided id could
 *   not be found and therefore could not create the new beer_post resource.
 */

const createNewBeer: CreateBeerRequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { description, name, abv, ibu, breweryId, typeId } = req.body;

    if (!(name && description && abv && ibu && breweryId && typeId))
      throw new ServerError('Missing params in request body.', 400);

    const breweryIdIsValid = checkIfValidUuid(breweryId);
    const typeIdIsValid = checkIfValidUuid(typeId);

    if (!breweryIdIsValid) {
      throw new ServerError(
        'Cannot create a new beer resource as the given brewery id is invalid.',
        400,
      );
    }

    if (!typeIdIsValid) {
      throw new ServerError(
        'Cannot create a new beer resource as the given type id is invalid.',
        400,
      );
    }
    const newBeer = BeerPost.create();
    const brewery = await BreweryPost.findOneBy({ id: breweryId });
    const type = await BeerType.findOneBy({ id: typeId });

    if (!brewery) {
      throw new ServerError('Could not find the brewery for posted beer.', 404);
    }
    if (!type) {
      throw new ServerError('Could not find the type for the posted beer.', 404);
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
    newBeer.createdAt = new Date(Date.now());

    await newBeer.save();

    const { newAccessToken } = req;

    const routeResponse = new SuccessResponse(
      'Created a new beer.',
      201,
      newBeer,
      newAccessToken,
    );
    next(routeResponse);
  } catch (e) {
    next(e);
  }
};

export default createNewBeer;
