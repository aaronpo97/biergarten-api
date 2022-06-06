import Brewery from '../../../database/model/Brewery';
import BreweryReview from '../../../database/model/BreweryReview';
import User from '../../../database/model/User';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { createBreweryReviewFn } from '../types/RequestHandlers';

const createNewBreweryReview: createBreweryReviewFn = async (req, res, next) => {
  try {
    const { rating, reviewBody } = req.body;
    const { breweryId } = req.params;

    if (!(rating && reviewBody)) {
      throw new ServerError('Rating and review body are required.', 400);
    }

    if (!isValidUuid(breweryId)) {
      throw new ServerError('The provided brewery id is invalid.', 400);
    }

    const breweryPost = await Brewery.findOne({ where: { id: breweryId } });

    if (!breweryPost) {
      throw new ServerError('Could not find a brewery with that id', 404);
    }

    const breweryReview = new BreweryReview();

    // @ts-expect-error
    const currentUser = req.currentUser as User;

    breweryReview.breweryPost = breweryPost;
    breweryReview.rating = rating;
    breweryReview.reviewBody = reviewBody;
    breweryReview.postedDate = new Date(Date.now());
    breweryReview.postedBy = currentUser;
    breweryReview.editedDate = null;

    await breweryReview.save();

    // @ts-expect-error
    const newAccessToken = req.newAccessToken as string | undefined;

    const successResponse = new SuccessResponse<BreweryReview>(
      `Created a new review for the brewery with id ${breweryId}`,
      201,
      breweryReview,
      newAccessToken,
    );

    next(successResponse);
  } catch (error) {
    next(error);
  }
};

export default createNewBreweryReview;
