import { BeerRequestHandler } from '../types/RequestHandlers';

import BeerPost from '../../../database/model/BeerPost';
import SuccessResponse from '../../../util/response/SuccessResponse';
import AppDataSource from '../../../database/AppDataSource';

/** Business logic for retrieving beer posts from the database and sending it to the client. */
const getAllBeers: BeerRequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { paginated = false, page_num, page_size } = req.query;

    const queryBase = AppDataSource.getRepository(BeerPost)
      .createQueryBuilder('beer')
      .select(['beer', 'user.id', 'user.username', 'brewery.name', 'brewery.id'])
      .innerJoin('beer.postedBy', 'user')
      .innerJoin('beer.brewery', 'brewery');

    const paginateQuery = paginated && page_num && page_size;

    const allBeers = paginateQuery
      ? await queryBase
          .take(page_size)
          .skip(page_num === 1 ? 0 : Math.abs(Math.floor(page_num)) * page_size)
          .getMany()
      : await queryBase.getMany();

    const { newAccessToken } = req;

    const message = paginateQuery
      ? `Sending page ${page_num} of beers.`
      : 'Sending all beers';

    const payload = paginateQuery
      ? { page_num, page_size, beer_posts: allBeers }
      : allBeers;

    const successResponse = new SuccessResponse(message, 200, payload, newAccessToken);

    next(successResponse);
  } catch (e) {
    next(e);
  }
};

export default getAllBeers;
