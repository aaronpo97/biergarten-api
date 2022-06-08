import AppDataSource from '../../database/AppDataSource';
import BeerComment from '../../database/model/BeerComment';
import User from '../../database/model/User';
import ServerError from '../../util/error/ServerError';
import isValidUuid from '../../util/validation/isValidUuid';
import { BeerCommentMiddlewareFn } from './types/authMiddlewareTypes';

const checkIfBeerCommentOwner: BeerCommentMiddlewareFn = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    if (!isValidUuid(commentId)) {
      throw new ServerError('The provided comment id is invalid.', 400);
    }

    const queriedComment = await AppDataSource.getRepository(BeerComment)
      .createQueryBuilder('beerComment')
      .leftJoinAndSelect('beerComment.postedBy', 'user')
      .where('beerComment.id = :commentId', { commentId })
      .getOne();

    if (!queriedComment) {
      throw new ServerError('Could not find a comment that id.', 404);
    }

    // @ts-expect-error
    const currentUser = req.currentUser as User;

    if (queriedComment.postedBy.id !== currentUser.id) {
      throw new ServerError('You are not authorized to modify this beer comment.', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default checkIfBeerCommentOwner;
