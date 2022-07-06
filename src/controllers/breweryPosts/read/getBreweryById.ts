import AppDataSource from '../../../database/AppDataSource';

import BreweryPost from '../../../database/model/BreweryPost';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
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

    const queriedBrewery = await AppDataSource.getRepository(BreweryPost)
      .createQueryBuilder('brewery')
      .select(['brewery', 'beer', 'user.id', 'user.username'])
      .innerJoin('brewery.beers', 'beers')
      .innerJoin('brewery.postedBy', 'users')
      .where('brewery.id = :breweryId', { breweryId })
      .getOne();

    if (!queriedBrewery) {
      throw new ServerError('Could not find a brewery with that id.', 404);
    }

    const { newAccessToken } = req;
    const successResponse = new SuccessResponse(
      `Sending brewery with the id ${breweryId}`,
      200,
      queriedBrewery,
      newAccessToken,
    );

    next(successResponse);
  } catch (e) {
    next(e);
  }
};

export default getBreweryById;
