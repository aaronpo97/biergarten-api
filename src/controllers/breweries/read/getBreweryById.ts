/**
 * Business logic for getting a brewery by its id. The req.params will contain the brewery id as a string, called breweryIdString.
 */

import { RequestHandler } from 'express-serve-static-core';
import Brewery from '../../../database/model/Brewery';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

const getBreweryById: RequestHandler<{ breweryIdString: string }, null, null> = async (
  req,
  res,
  next,
) => {
  try {
    const { breweryIdString } = req.params;

    const breweryId = parseInt(breweryIdString, 10);
    if (Number.isNaN(breweryId)) {
      throw new ServerError('Could not find a brewery with that id as it invalid. ', 404);
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
