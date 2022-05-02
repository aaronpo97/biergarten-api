import { BeerRequestHandler } from '../@types/RequestHandlers';

import Beer from '../../../database/model/Beer';
import ErrorResponse from '../../../util/response/ErrorResponse';
import SuccessResponse from '../../../util/response/SuccessResponse';

/** Business logic for retrieving beers from the database and sending it to the client. */
const getAllBeers: BeerRequestHandler = async (req, res, next): Promise<void> => {
  try {
    const allBeers = await Beer.find({
      join: { alias: 'beer', leftJoinAndSelect: { brewery: 'beer.brewery', user: 'beer.postedBy' } },
    });

    const successResponse = new SuccessResponse('Sending all beers.', 200, allBeers);
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
