import Beer from '../../../database/model/Beer';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import { BeerByIdRequestHandler } from '../@types/RequestHandlers';

const getBeerById: BeerByIdRequestHandler = async (req, res, next) => {
  try {
    const beerId = parseInt(req.params.beerIdString, 10);
    const queriedBeer = await Beer.findOneBy({ id: beerId });
    if (!queriedBeer) {
      throw new ServerError('Could not find a beer with that id.', 404);
    }
    const successResponse = new SuccessResponse(`Sending beer id ${beerId}`, 200, queriedBeer);

    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }
    next(new ServerError('Something went wrong.', 500));
  }
};

export default getBeerById;
