import { BreweryRequestHandler } from '../types/RequestHandlers';

import SuccessResponse from '../../../util/response/SuccessResponse';
import BreweryPost from '../../../database/model/BreweryPost';
import ErrorResponse from '../../../util/response/ErrorResponse';
import ServerError from '../../../util/error/ServerError';
import AppDataSource from '../../../database/AppDataSource';

/** Business logic for retrieving brewery data from the database and sending it to the client. */
const getAllBreweries: BreweryRequestHandler = async (req, res, next): Promise<void> => {
  try {
    const pageNum = Math.abs(parseInt(req.query.page_num || '1', 10));
    const pageSize = Math.abs(parseInt(req.query.page_size || '5', 10));

    const allBreweries = await AppDataSource.getRepository(BreweryPost)
      .createQueryBuilder('brewery')
      .innerJoinAndSelect('brewery.beers', 'beers')
      .innerJoinAndSelect('brewery.postedBy', 'users')
      .take(pageSize)
      .skip(pageNum === 1 ? 0 : pageNum * pageSize)
      .getMany();

    const routeResponse = new SuccessResponse(`Getting page ${pageNum} of breweries.`, 200, allBreweries);
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

export default getAllBreweries;
