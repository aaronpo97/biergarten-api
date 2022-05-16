import BeerComment from '../../../database/model/BeerComment';
import ServerError from '../../../util/error/ServerError';
import isValidUuid from '../../../util/validation/isValidUuid';
import { editCommentByIdT } from '../types/RequestHandlers';

/**
 * Business logic for editing a comment by its id.
 *
 * Takes in the comment id as part of the request parameters, and the comment edits in the
 * request body. If there are no comment edits provided, the server will send error status
 * code 400, with a message saying that the server could not update the comment as there
 * were no edits provided.
 */
const editCommentById: editCommentByIdT = async (req, res, next) => {
  try {
    const { commentId: id } = req.params;
    const { commentEditBody } = req.body;

    if (!isValidUuid(id)) {
      throw new ServerError(
        `Could not update a comment with the id of ${id} as it is invalid.`,
        400,
      );
    }

    if (!commentEditBody) {
      throw new ServerError(
        'No edits were provided to the request body, and therefore the comment was not edited.',
        400,
      );
    }

    const commentToEdit = await BeerComment.findOne({ where: { id } });

    if (!commentToEdit) {
      throw new ServerError(
        'Could not edit a comment with that id as it does not exist.',
        404,
      );
    }

    commentToEdit.commentBody = commentEditBody;

    await commentToEdit.save();
  } catch (error) {
    if (error instanceof Error) {
      next(error);
      return;
    }

    next(new ServerError('Something went wrong.', 500));
  }
};

export default editCommentById;
