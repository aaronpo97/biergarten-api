import { GetAllBreweriesRequestHandler } from '../types/RequestHandlers';

import SuccessResponse from '../../../util/response/SuccessResponse';
import BreweryPost from '../../../database/model/BreweryPost';
import AppDataSource from '../../../database/AppDataSource';

/** Business logic for retrieving brewery data from the database and sending it to the client. */
const getAllBreweries: GetAllBreweriesRequestHandler = async (req, res, next) => {
  try {
    const { paginated = false, page_num, page_size } = req.query;
    const queryBase = AppDataSource.getRepository(BreweryPost)
      .createQueryBuilder('brewery')
      .select(['brewery', 'beer.name', 'beer.id', 'user.id', 'user.username'])
      .innerJoin('brewery.beers', 'beer')
      .innerJoin('brewery.postedBy', 'user');

    const paginateQuery = paginated && page_num && page_size;
    const allBreweries = paginateQuery
      ? await queryBase
          .take(page_size)
          .skip(page_num === 1 ? 0 : Math.abs(Math.floor(page_num)) * page_size)
          .getMany()
      : await queryBase.getMany();

    const { newAccessToken } = req;

    const message = paginateQuery
      ? `Getting ${page_num} of breweries.`
      : 'Getting all breweries.';

    const payload = paginateQuery
      ? { page_num, page_size, breweryPosts: allBreweries }
      : allBreweries;

    const routeResponse = new SuccessResponse(message, 200, payload, newAccessToken);
    next(routeResponse);
  } catch (e) {
    next(e);
  }
};

export default getAllBreweries;
