import AppDataSource from '../../../database/AppDataSource';

import BeerPost from '../../../database/model/BeerPost';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { BeerByIdRequestHandler } from '../types/RequestHandlers';

/**
 * Business logic for getting a beer post by its id.
 *
 * @throws ServerError with status 400 if the client provided beer post id is invalid.
 * @throws ServerError with status 404 if a beer post with the client provided beer post
 *   id could not be found.
 */
const getBeerById: BeerByIdRequestHandler = async (req, res, next) => {
  try {
    const { beerId } = req.params;

    if (!isValidUuid(beerId)) {
      throw new ServerError('Could not get a beer with that id as it is invalid.', 400);
    }

    const queriedBeer = await AppDataSource.getRepository(BeerPost)
      .createQueryBuilder('beer')
      .select([
        'beer',
        'user.id',
        'user.username',
        'brewery.name',
        'brewery.id',
        'beerType.name',
        'beerType.id',
      ])
      .innerJoin('beer.postedBy', 'user')
      .innerJoin('beer.brewery', 'brewery')
      .innerJoin('beer.type', 'beerType')
      .where('beer.id = :beerId', { beerId })
      .getOne();

    if (!queriedBeer) {
      throw new ServerError('Could not find a beer with that id.', 404);
    }

    const { newAccessToken } = req;

    const successResponse = new SuccessResponse(
      `Sending beer id ${beerId}`,
      200,
      queriedBeer,
      newAccessToken,
    );
    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }
    next(new ServerError('Something went wrong.', 500));
  }
};

export default getBeerById;
