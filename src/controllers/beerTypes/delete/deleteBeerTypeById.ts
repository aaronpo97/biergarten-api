import { RequestHandler } from 'express-serve-static-core';
import AppDataSource from '../../../database/AppDataSource';
import BeerType from '../../../database/model/BeerType';
import SuccessResponse from '../../../util/response/SuccessResponse';

type deleteBeerTypeByIdFunction = RequestHandler<{ id: string }, {}, {}, {}>;

/**
 * Business logic middleware for deleting a beer type by its id. This middleware must come
 * after the checkIfBeerTypeOwner so the beer type resource will be appended to the request body.
 */
const deleteBeerTypeById: deleteBeerTypeByIdFunction = async (req, res, next) => {
  const { id } = req.params;

  const deleteQuery = await AppDataSource.createQueryBuilder()
    .delete()
    .from(BeerType)
    .where('id = :id', { id })
    .execute();

  const { newAccessToken } = req;

  const successResponse = new SuccessResponse(
    `Deleted the resource with id ${id}`,
    200,
    null,
    newAccessToken,
  );

  next(successResponse);
};
export default deleteBeerTypeById;
