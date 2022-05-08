import { RequestHandler } from 'express-serve-static-core';
import AppDataSource from '../../../database/AppDataSource';
import BeerComment from '../../../database/model/BeerComment';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

import { getAllCommentsT } from '../types/RequestHandlers';

const getAllComments: getAllCommentsT = async (req, res, next) => {
  try {
    const allComments: BeerComment[] = await AppDataSource.getRepository(BeerComment)
      .createQueryBuilder('beerComment')
      .leftJoin('beerComment.beerPost', 'beerPost')
      .where('beerPost.id = :beerId', { beerId: req.params.beerId })
      .getMany();

    next(new SuccessResponse('Getting all comments.', 200, allComments));
  } catch (e) {
    if (e instanceof Error) {
      next(e);
      return;
    }
    next(new ServerError('something went wrong', 500));
  }
};

export default getAllComments;
