import AppDataSource from '../../../database/AppDataSource';
import BeerComment from '../../../database/model/BeerComment';
import SuccessResponse from '../../../util/response/SuccessResponse';

import { getAllCommentsT } from '../types/RequestHandlers';

/**
 * Business logic for getting all comments for the client.
 *
 * Takes the page number, page size, and paginated (boolean) as an optional request query.
 */
const getAllComments: getAllCommentsT = async (req, res, next) => {
  try {
    const { page_num, page_size, paginated = false } = req.query;

    const queryBase = AppDataSource.getRepository(BeerComment)
      .createQueryBuilder('beerComment')
      .select([
        'beerComment',
        'beerPost.name',
        'beerPost.id',
        'postedBy.username',
        'postedBy.id',
      ])
      .innerJoin('beerComment.beerPost', 'beerPost')
      .innerJoin('beerComment.postedBy', 'postedBy')
      .where('beerPost.id = :beerId', { beerId: req.params.beerId });

    const paginateQuery = paginated && page_size && page_num;
    const allComments = paginateQuery
      ? await queryBase
          .take(page_size)
          .skip(page_num === 1 ? 0 : page_num * page_size)
          .getMany()
      : await queryBase.getMany();

    const { newAccessToken } = req;

    const message = paginateQuery
      ? `Getting page ${page_num} of comments.`
      : 'Getting all comments.';

    const payload = paginateQuery
      ? { page_num, page_size, beerComments: allComments }
      : allComments;

    const successResponse = new SuccessResponse(message, 200, payload, newAccessToken);
    next(successResponse);
  } catch (e) {
    next(e);
  }
};

export default getAllComments;
