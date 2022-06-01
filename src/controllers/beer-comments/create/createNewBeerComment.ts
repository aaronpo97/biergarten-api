import Beer from '../../../database/model/Beer';
import BeerComment from '../../../database/model/BeerComment';
import User from '../../../database/model/User';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { createNewCommentT } from '../types/RequestHandlers';

/**
 * Business logic for creating a new beer post comment.
 *
 * Takes in the beer id as a request param, and a comment + rating as part of the request body.
 */

const createNewComment: createNewCommentT = async (req, res, next) => {
  try {
    const { beerId } = req.params;
    const { comment, rating } = req.body;

    /** @todo Amend current user to the request object. */
    // @ts-expect-error
    const currentUser = req.currentUser as User;

    if (!isValidUuid(beerId)) {
      throw new ServerError('Cannot post comment. The given beer id was invalid.', 400);
    }

    if (!comment) {
      throw new ServerError('Comment must contain a value.', 400);
    }
    if (!rating) {
      throw new ServerError('Rating is required.', 400);
    }

    const beer = await Beer.findOne({ where: { id: beerId } });

    if (!beer) {
      throw new ServerError(
        'Cannot post comment as a beer with the given id could not be found.',
        404,
      );
    }

    const beerComment = new BeerComment();

    beerComment.beerPost = beer;
    beerComment.commentBody = comment;

    beerComment.postedDate = new Date(Date.now());

    beerComment.postedBy = currentUser;
    beerComment.rating = rating;
    await beerComment.save();

    const successResponse = new SuccessResponse('Comment created.', 200, beerComment);

    next(successResponse);
  } catch (error) {
    if (error instanceof Error) {
      next(error);
      return;
    }
    next(new ServerError('Something went wrong.', 400));
  }
};

export default createNewComment;
