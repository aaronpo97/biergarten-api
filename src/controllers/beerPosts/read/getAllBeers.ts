import { BeerRequestHandler } from '../types/RequestHandlers';

import BeerPost from '../../../database/model/BeerPost';
import SuccessResponse from '../../../util/response/SuccessResponse';
import AppDataSource from '../../../database/AppDataSource';
import getPageCount from '../../../util/pagination/getPageCount';
import getBeerPostSortingMethod from '../../../util/sorting/getBeerPostSortingMethod';

/** Business logic for retrieving beer posts from the database and sending it to the client. */
const getAllBeers: BeerRequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { paginated = false, page_num, page_size, sort } = req.query;

    const queryBase = AppDataSource.getRepository(BeerPost)
      .createQueryBuilder('beer')
      .select([
        'beer',
        'user.id',
        'user.username',
        'brewery.name',
        'brewery.id',
        'beerType.name',
        'beerType.id',
      ])
      .innerJoin('beer.postedBy', 'user')
      .innerJoin('beer.brewery', 'brewery')
      .innerJoin('beer.type', 'beerType')
      .orderBy(getBeerPostSortingMethod(sort));

    const paginateQuery = paginated && page_num && page_size;

    const count = await AppDataSource.getRepository(BeerPost).count();

    const pageCount = page_size ? getPageCount(page_size, count) : undefined;

    const allBeers = paginateQuery
      ? await queryBase
          .take(page_size)
          .skip(page_num === 1 ? 0 : Math.abs(Math.floor(page_num)) * page_size)
          .getMany()
      : await queryBase.getMany();

    const { newAccessToken } = req;

    const message = paginateQuery
      ? `Sending page ${page_num} of ${pageCount} of beers.`
      : 'Sending all beers';

    const payload = paginateQuery
      ? { page_num, page_size, sorted_by: sort, beer_posts: allBeers }
      : {beer_posts: allBeers, sorted_by: sort};

    const successResponse = new SuccessResponse(
      message,
      200,
      payload,
      newAccessToken,
    );

    next(successResponse);
  } catch (e) {
    next(e);
  }
};

export default getAllBeers;
