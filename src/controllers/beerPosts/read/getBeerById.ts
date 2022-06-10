import AppDataSource from '../../../database/AppDataSource';

import BeerPost from '../../../database/model/BeerPost';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { BeerByIdRequestHandler } from '../@types/RequestHandlers';

/**
 * Business logic for getting a beer post by its id.
 *
 * Takes in the beer post id as part of the request params and will throw error 400 if the
 * provided id is invalid. The server will also throw error 404 if a beer with the
 * provided id could not be found.
 */
const getBeerById: BeerByIdRequestHandler = async (req, res, next) => {
  try {
    const { beerId } = req.params;

    if (!isValidUuid(beerId)) {
      throw new ServerError('Could not get a beer with that id as it is invalid.', 400);
    }

    /** @todo Fix this query so user details are not exposed. */
    const queriedBeer = await AppDataSource.getRepository(BeerPost)
      .createQueryBuilder('beer')
      .leftJoinAndSelect('beer.postedBy', 'user')
      .where('beer.id = :beerId', { beerId })
      .leftJoinAndSelect('beer.brewery', 'brewery')
      .getOne();

    if (!queriedBeer) {
      throw new ServerError('Could not find a beer with that id.', 404);
    }

    const successResponse = new SuccessResponse(
      `Sending beer id ${beerId}`,
      200,
      queriedBeer,
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
