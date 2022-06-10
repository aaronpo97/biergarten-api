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

    const pageNum = Math.abs(parseInt(req.query.page_num || '1', 10));
    const pageSize = Math.abs(parseInt(req.query.page_size || '5', 10));

    const allReviews = await AppDataSource.getRepository(BreweryReview)
      .createQueryBuilder('breweryReview')
      .leftJoin('breweryReview.breweryPost', 'brewery')
      .where('breweryReview.breweryPost = :breweryId', { breweryId })
      .take(pageSize)
      .skip(pageNum === 1 ? 0 : pageNum * pageSize)
      .getMany();

    const successResponse = new SuccessResponse<ReadonlyArray<BreweryReview>>(
      `Getting all reviews for brewery: ${breweryId}`,
      200,
      allReviews,
    );
    next(successResponse);
  } catch (error) {
    next(error);
  }
};

export default getAllBreweryReviews;
