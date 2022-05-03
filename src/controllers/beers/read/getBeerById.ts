import { validate as isValidUuid } from 'uuid';

import Beer from '../../../database/model/Beer';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import { BeerByIdRequestHandler } from '../@types/RequestHandlers';

const getBeerById: BeerByIdRequestHandler = async (req, res, next) => {
  try {
    const { beerId } = req.params;

    if (!isValidUuid(beerId)) {
      throw new ServerError('Could not get a beer with that id as it is invalid.', 400);
    }

    const queriedBeer = await Beer.findOne({
      where: { id: beerId },
      join: {
        alias: 'beer',
        leftJoinAndSelect: { brewery: 'beer.brewery', user: 'beer.postedBy' },
      },
    });

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
