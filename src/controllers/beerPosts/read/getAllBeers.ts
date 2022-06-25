import { BeerRequestHandler } from '../types/RequestHandlers';

import BeerPost from '../../../database/model/BeerPost';
import ErrorResponse from '../../../util/response/ErrorResponse';
import SuccessResponse from '../../../util/response/SuccessResponse';
import AppDataSource from '../../../database/AppDataSource';

/**
 * Business logic for retrieving beers from the database and sending it to the client.
 *
 * Upon successful request, the server will pass an instance of ServerError upon a failed
 * request, or an instance of SuccessResponse upon a successful request over to the
 * response handling middleware. The instance of SuccessResponse will give a status of 200
 * and a payload consisting of all the beers in the database, or an empty array if that
 * column is empty.
 */

const getAllBeers: BeerRequestHandler = async (req, res, next): Promise<void> => {
  try {
    const pageNum = Math.abs(parseInt(req.query.page_num || '1', 10));
    const pageSize = Math.abs(parseInt(req.query.page_size || '5', 10));

    /** @todo Fix this query so user details are not exposed. */
    const allBeers = await AppDataSource.getRepository(BeerPost)
      .createQueryBuilder('beer')
      .leftJoinAndSelect('beer.postedBy', 'user')
      .leftJoinAndSelect('beer.brewery', 'brewery')
      .take(pageSize)
      .skip(pageNum === 1 ? 0 : pageNum * pageSize)
      .getMany();

    const { newAccessToken } = req;
    const successResponse = new SuccessResponse(
      `Sending page ${pageNum} of beers.`,
      200,
      { pageNum, pageSize, allBeers },
      newAccessToken,
    );

    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      const errorResponse = new ErrorResponse(e.message, 500, e.stack);
      next(errorResponse);
    }
    next();
  }
};

export default getAllBeers;
