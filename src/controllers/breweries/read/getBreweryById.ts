import { validate as isValidUuid } from 'uuid';

import Brewery from '../../../database/model/Brewery';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import { BreweryByIdRequestHandler } from '../types/RequestHandlers';

/**
 * Business logic for getting a brewery by its id.
 *
 * The req.params will contain the brewery id as a string, called breweryIdString.
 */
const getBreweryById: BreweryByIdRequestHandler = async (req, res, next) => {
  try {
    const { breweryId } = req.params;

    if (!isValidUuid(breweryId)) {
      throw new ServerError('Could not get a brewery with that id as it is invalid', 400);
    }

    const queriedBrewery = await Brewery.findOneBy({ id: breweryId });

    if (!queriedBrewery) {
      throw new ServerError('Could not find a brewery with that id.', 404);
    }
    const successResponse = new SuccessResponse(
      `Sending brewery with the id of ${breweryId}`,
      200,
      queriedBrewery,
    );

    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }
    next(new ServerError('Something went wrong.', 500));
  }
};

export default getBreweryById;
