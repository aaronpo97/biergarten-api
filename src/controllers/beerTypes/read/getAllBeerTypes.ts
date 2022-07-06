import { RequestHandler } from 'express-serve-static-core';

import AppDataSource from '../../../database/AppDataSource';
import BeerType from '../../../database/model/BeerType';
import SuccessResponse from '../../../util/response/SuccessResponse';

type getAllBeerTypesFunction = RequestHandler<
  {},
  {},
  {},
  { page_num?: number; page_size?: number; paginated?: boolean }
>;

const getAllBeerTypes: getAllBeerTypesFunction = async (req, res, next) => {
  try {
    const queryBase = AppDataSource.getRepository(BeerType)
      .createQueryBuilder('beerType')
      .select(['beerType', 'postedBy.username', 'postedBy.id'])
      .innerJoin('beerType.postedBy', 'postedBy');

    const { page_num, page_size, paginated = false } = req.query;

    const paginateQuery = page_num && page_size && paginated;

    const allBeerTypes = paginateQuery
      ? await queryBase
          .take(page_size)
          .skip(page_num === 1 ? 0 : Math.abs(Math.floor(page_num)) * page_size)
          .getMany()
      : await queryBase.getMany();

    const payload = paginateQuery
      ? { page_num, page_size, beerTypes: allBeerTypes }
      : allBeerTypes;
    const message = paginateQuery
      ? `Sending page ${page_num} of beer types.`
      : 'Sending all beer types.';

    const { newAccessToken } = req;
    const routeResponse = new SuccessResponse(message, 200, payload, newAccessToken);
    next(routeResponse);
  } catch (e) {
    next(e);
  }
};
export default getAllBeerTypes;
