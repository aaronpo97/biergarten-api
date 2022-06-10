import AppDataSource from '../../database/AppDataSource';
import BreweryReview from '../../database/model/BreweryReview';
import ServerError from '../../util/error/ServerError';
import isValidUuid from '../../util/validation/isValidUuid';
import { BreweryReviewMiddlewareFn } from './types/authMiddlewareTypes';

const checkIfBreweryReviewOwner: BreweryReviewMiddlewareFn = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    if (!isValidUuid(reviewId)) {
      throw new ServerError('The provided review id is invalid', 400);
    }

    const queriedReview = await AppDataSource.getRepository(BreweryReview)
      .createQueryBuilder('breweryReview')
      .leftJoinAndSelect('breweryReview.postedBy', 'user')
      .where('breweryReview.id = :reviewId', { reviewId })
      .getOne();

    if (!queriedReview) {
      throw new ServerError('Could not find a comment that id.', 404);
    }

    const { currentUser } = req;

    if (queriedReview.postedBy.id !== currentUser?.id) {
      throw new ServerError('You are not authorized to modify this resource.', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default checkIfBreweryReviewOwner;
