import { breweryReviewByIdFn } from '../types/RequestHandlers';
import BreweryReview from '../../../database/model/BreweryReview';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import AppDataSource from '../../../database/AppDataSource';

const getBreweryReviewById: breweryReviewByIdFn = async (req, res, next) => {
  try {
    const { reviewId, breweryId } = req.params;

    const breweryReview = await AppDataSource.getRepository(BreweryReview)
      .createQueryBuilder('breweryReview')
      .leftJoinAndSelect('breweryReview.breweryPost', 'brewery')
      .leftJoinAndSelect('breweryReview.postedBy', 'postedBy')
      .where('breweryReview.breweryPost = :breweryId', { breweryId })
      .andWhere('breweryReview.id = :reviewId', { reviewId })
      .getOne();

    if (!breweryReview) {
      throw new ServerError('Could not locate a brewery review with that id.', 404);
    }

    const { newAccessToken } = req;
    const successResponse = new SuccessResponse<BreweryReview>(
      `Sending the brewery review with the id ${breweryReview.id}.`,
      200,
      breweryReview,
      newAccessToken,
    );

    next(successResponse);
  } catch (error) {
    next(error);
  }
};

export default getBreweryReviewById;
