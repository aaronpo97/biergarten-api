import { getCommentByIdT } from '../types/RequestHandlers';

import AppDataSource from '../../../database/AppDataSource';
import BeerComment from '../../../database/model/BeerComment';

import isValidUuid from '../../../util/validation/isValidUuid';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

/**
 * Business logic for deleting a comment by its id.
 *
 * Will throw an error 400 if the the given comment id is invalid or the comment could not be found.
 */
const deleteCommentById: getCommentByIdT = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    if (!isValidUuid(commentId)) {
      throw new ServerError(
        'Could not delete a beer comment with that id as it is invalid.',
        400,
      );
    }

    const beerComment = await AppDataSource.getRepository(BeerComment)
      .createQueryBuilder()
      .delete()
      .from(BeerComment)
      .where('id = :commentId', { commentId })
      .execute();

    if (!beerComment.affected) {
      throw new ServerError(
        'Could not delete a comment with that id as it could not be found.',
        404,
      );
    }

    // @ts-expect-error
    const newAccessToken = req.newAccessToken as string | undefined;

    const response = new SuccessResponse(
      `Deleted a comment with the id of ${commentId}.`,
      200,
      { beerComment },
      newAccessToken,
    );

    next(response);
  } catch (error) {
    if (error instanceof Error) {
      next(error);
      return;
    }
    next(new ServerError('Something went wrong.', 500));
  }
};

export default deleteCommentById;
