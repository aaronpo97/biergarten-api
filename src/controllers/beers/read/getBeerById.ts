import AppDataSource from '../../../database/AppDataSource';

import Beer from '../../../database/model/Beer';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { BeerByIdRequestHandler } from '../@types/RequestHandlers';

const getBeerById: BeerByIdRequestHandler = async (req, res, next) => {
  try {
    const { beerId } = req.params;

    if (!isValidUuid(beerId)) {
      throw new ServerError('Could not get a beer with that id as it is invalid.', 400);
    }

    /** @todo Fix this query so user details are not exposed. */
    const queriedBeer = await AppDataSource.getRepository(Beer)
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
