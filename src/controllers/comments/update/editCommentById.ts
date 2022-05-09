import ServerError from '../../../util/error/ServerError';
import isValidUuid from '../../../util/validation/isValidUuid';
import { editCommentByIdT } from '../types/RequestHandlers';

const editCommentById: editCommentByIdT = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { commentEdits } = req.body;

    if (!isValidUuid(commentId)) {
      throw new ServerError(
        `Could not update a comment with the id of ${commentId} as it is invalid.`,
        400,
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      next(error);
      return;
    }

    next(new ServerError('Something went wrong.', 500));
  }
};

export default editCommentById;
