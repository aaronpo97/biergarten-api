import BreweryReview from '../../../database/model/BreweryReview';

import ServerError from '../../../util/error/ServerError';
import isValidUuid from '../../../util/validation/isValidUuid';
import SuccessResponse from '../../../util/response/SuccessResponse';

import { editBreweryReviewByIdFn } from '../types/RequestHandlers';

const editBreweryReviewById: editBreweryReviewByIdFn = async (req, res, next) => {
  try {
    const { breweryId, reviewId } = req.params;
    const { rating, reviewBody } = req.body;

    if (!(rating && reviewBody)) {
      throw new ServerError('An updated rating and/or review body is required.', 400);
    }

    if (!isValidUuid(breweryId)) {
      throw new ServerError('The provided brewery id is invalid.', 400);
    }

    if (!isValidUuid(reviewId)) {
      throw new ServerError('The provided review id is invalid.', 400);
    }

    const breweryReview = await BreweryReview.findOne({ where: { id: reviewId } });

    if (!breweryReview) {
      throw new ServerError('Could not find a review with that id.', 404);
    }

    const fieldsUpdated: { rating: boolean; reviewBody: boolean } = {
      rating: false,
      reviewBody: false,
    };

    if (rating) {
      breweryReview.rating = rating;
      fieldsUpdated.rating = true;
    }

    if (reviewBody) {
      breweryReview.reviewBody = reviewBody;
      fieldsUpdated.reviewBody = true;
    }

    breweryReview.editedDate = new Date(Date.now());

    await breweryReview.save();

    const newAccessToken = req.newAccessToken as string | undefined;

    const successResponse = new SuccessResponse<{
      breweryReview: BreweryReview;
      fieldsUpdated: typeof fieldsUpdated;
    }>(
      `Updated the review with id ${reviewId}.`,
      200,
      { breweryReview, fieldsUpdated },
      newAccessToken,
    );

    next(successResponse);
  } catch (error) {
    next(error);
  }
};

export default editBreweryReviewById;
