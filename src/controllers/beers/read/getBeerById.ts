import { RequestHandler } from 'express-serve-static-core';
import Beer from '../../../database/model/Beer';
import ServerError from '../../../util/error/ServerError';
import logger from '../../../util/logger';
import SuccessResponse from '../../../util/response/SuccessResponse';

const getBeerById: RequestHandler<{ beerIdString: string }, null, null, null> = async (
  req,
  res,
  next,
) => {
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
