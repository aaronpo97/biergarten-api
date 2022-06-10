import AppDataSource from '../../../database/AppDataSource';
import BeerComment from '../../../database/model/BeerComment';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

import { getAllCommentsT } from '../types/RequestHandlers';

const getAllComments: getAllCommentsT = async (req, res, next) => {
  try {
    const pageNum = Math.abs(parseInt(req.query.page_num || '1', 10));
    const pageSize = Math.abs(parseInt(req.query.page_size || '5', 10));

    const allComments = await AppDataSource.getRepository(BeerComment)
      .createQueryBuilder('beerComment')
      .leftJoin('beerComment.beerPost', 'beerPost')
      .where('beerPost.id = :beerId', { beerId: req.params.beerId })
      .take(pageSize)
      .skip(pageNum === 1 ? 0 : pageNum * pageSize)
      .getMany();

    const successResponse = new SuccessResponse(
      'Getting all comments.',
      200,
      allComments,
    );
    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(new ServerError('something went wrong', 500));
  }
};

export default getAllComments;
