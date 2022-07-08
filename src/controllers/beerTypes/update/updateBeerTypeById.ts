import { RequestHandler } from 'express-serve-static-core';
import BeerType from '../../../database/model/BeerType';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

type updateBeerTypeByIdFunction = RequestHandler<
  { id: string },
  {},
  { descriptionUpdate?: string; nameUpdate?: string },
  {}
>;

const updateBeerTypeById: updateBeerTypeByIdFunction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { descriptionUpdate, nameUpdate } = req.body;

    if (!descriptionUpdate && !nameUpdate) {
      const notModifiedResponse = new SuccessResponse('Not modified.', 304, undefined);
      next(notModifiedResponse);
      return;
    }

    const beerTypeToUpdate = await BeerType.findOne({ where: { id } });

    if (!beerTypeToUpdate) {
      throw new ServerError(
        'Could not update a beer type with that id as it could not be found.',
        404,
      );
    }

    if(descriptionUpdate){
      beerTypeToUpdate.description = descriptionUpdate
    }

    if (nameUpdate){
      beerTypeToUpdate.name = nameUpdate
    }

    const successResponse = new SuccessResponse(``, 204, undefined);
    next(successResponse);
  } catch (e) {
    next(e);
  }
};
export default updateBeerTypeById;
