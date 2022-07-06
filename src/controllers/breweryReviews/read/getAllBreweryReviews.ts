import AppDataSource from '../../../database/AppDataSource';
import BreweryReview from '../../../database/model/BreweryReview';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { getAllBreweryReviewsFn } from '../types/RequestHandlers';

const getAllBreweryReviews: getAllBreweryReviewsFn = async (req, res, next) => {
  try {
    const { breweryId } = req.params;

    if (!isValidUuid(breweryId)) {
      throw new ServerError('The provided brewery id is invalid.', 400);
    }

    const { paginated, page_num, page_size } = req.query;

    const queryBase = AppDataSource.getRepository(BreweryReview)
      .createQueryBuilder('breweryReview')
      .select(['breweryReview', 'brewery', 'user.username', 'user.id'])
      .innerJoin('breweryReview.breweryPost', 'brewery')
      .innerJoin('breweryReview.postedBy', 'user')
      .where('breweryReview.breweryPost = :breweryId', { breweryId });

    const paginateQuery = paginated && page_size && page_num;

    const allReviews = paginateQuery
      ? await queryBase
          .take(page_size)
          .skip(page_num === 1 ? 0 : page_num * page_size)
          .getMany()
      : await queryBase.getMany();

    const { newAccessToken } = req;

    const successResponse = new SuccessResponse<BreweryReview[]>(
      `Getting all reviews for brewery: ${breweryId}`,
      200,
      allReviews,
      newAccessToken,
    );
    next(successResponse);
  } catch (error) {
    next(error);
  }
};

export default getAllBreweryReviews;
