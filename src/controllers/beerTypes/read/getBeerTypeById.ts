import { RequestHandler } from 'express-serve-static-core';
import AppDataSource from '../../../database/AppDataSource';
import BeerType from '../../../database/model/BeerType';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';

type GetBeerTypeByIdFn = RequestHandler<{ id: string }, {}, {}>;

const getBeerTypeById: GetBeerTypeByIdFn = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidUuid(id)) {
      throw new ServerError('The provided id is invalid.', 400);
    }

    const queriedType = await AppDataSource.getRepository(BeerType)
      .createQueryBuilder('beerType')
      .select(['beerType', 'user.id', 'user.username'])
      .innerJoin('beerType.postedBy', 'user')
      .where('beerType.id = :id', { id })
      .getOne();

    if (!queriedType) {
      throw new ServerError('Cannot find a beer type with that id.', 404);
    }

    const successResponse = new SuccessResponse(
      `Getting the type with id: ${id}`,
      200,
      queriedType,
    );
    next(successResponse);
  } catch (e) {
    next(e);
  }
};
export default getBeerTypeById;
