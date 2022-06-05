import { breweryReviewByIdFn } from '../types/RequestHandlers';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import ServerError from '../../../util/error/ServerError';
import BreweryReview from '../../../database/model/BreweryReview';

const deleteBreweryReviewById: breweryReviewByIdFn = async (req, res, next) => {
  try {
    const { reviewId, breweryId } = req.params;

    if (!isValidUuid(breweryId)) {
      throw new ServerError(
        'Could not find a brewery with that id as it is invalid.',
        400,
      );
    }

    if (!isValidUuid(reviewId)) {
      throw new ServerError(
        'Could not find a brewery review with that id as it is invalid.',
        400,
      );
    }

    const queriedBreweryReview = await BreweryReview.findOne({ where: { id: reviewId } });

    if (!queriedBreweryReview) {
      throw new ServerError('Could not find a brewery review with that id.', 404);
    }

    await BreweryReview.remove([queriedBreweryReview]);

    const successResponse = new SuccessResponse<{ review: BreweryReview; deleted: true }>(
      `Deleted a brewery review with the id of ${reviewId}.`,
      200,
      { review: queriedBreweryReview, deleted: true },
    );
    next(successResponse);
  } catch (error) {
    next(error);
  }
};

export default deleteBreweryReviewById;
