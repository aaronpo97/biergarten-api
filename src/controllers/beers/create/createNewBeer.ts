import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';

import ErrorResponse from '../../../util/response/ErrorResponse';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import ICreateBeerReqBody from './types/ICreateBeerReqBody';
import Beer from '../../../database/model/Beer';
import Brewery from '../../../database/model/Brewery';

/**
 * Business logic for creating a new brewery.
 * @type {RequestHandler}
 * @returns {Promise<void>}
 */

const createNewBeer: RequestHandler<ParamsDictionary, null, ICreateBeerReqBody, null> = async (
  req,
  res,
  next,
): Promise<void> => {
  try {
    const { description, name, abv, ibu, breweryId } = req.body;

    if (!(name && description && abv && ibu && breweryId))
      throw new ServerError('Missing params in request body.', 400);

    const newBeer = Beer.create();
    const brewery = await Brewery.findOneBy({ id: breweryId });

    if (!brewery) throw new ServerError('Could not find that brewery.', 404);

    newBeer.description = description;
    newBeer.name = name;
    newBeer.abv = abv;
    newBeer.ibu = ibu;
    newBeer.brewery = brewery;

    await newBeer.save();

    const routeResponse = new SuccessResponse('Created a new brewery.', 201, newBeer);
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

export default createNewBeer;
