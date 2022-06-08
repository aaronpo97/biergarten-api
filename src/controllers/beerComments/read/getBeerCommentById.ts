import AppDataSource from '../../../database/AppDataSource';
import BeerPost from '../../../database/model/BeerPost';
import BeerComment from '../../../database/model/BeerComment';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { getCommentByIdT } from '../types/RequestHandlers';

const getCommentById: getCommentByIdT = async (req, res, next) => {
  try {
    const { beerId, commentId } = req.params;

    if (!isValidUuid(beerId)) {
      throw new ServerError(
        `Could not find that a comment for the beer post with the id of ${beerId} as it is invalid.`,
        400,
      );
    }

    if (!isValidUuid(commentId)) {
      throw new ServerError(
        `Could not find a comment with the id of ${commentId} as it is invalid.`,
        400,
      );
    }

    const beerPost = await BeerPost.findOne({ where: { id: beerId } });

    if (!beerPost) {
      throw new ServerError('Could not find a beer post with that id.', 404);
    }
    const comment = await AppDataSource.getRepository(BeerComment)
      .createQueryBuilder('beerComment')
      .leftJoinAndSelect('beerComment.beerPost', 'beerPost')
      .where('beerPost.id = :beerId', { beerId: req.params.beerId })
      .andWhere('beerComment.id = :commentId', { commentId })
      .getOne();

    if (!comment) {
      throw new ServerError('Sorry, a comment with that id could not be found.', 404);
    }

    const successResponse = new SuccessResponse(
      `Getting the comment with the id ${commentId}`,
      200,
      comment,
    );
    next(successResponse);
  } catch (error) {
    if (error instanceof Error) {
      next(error);
    }
    next(new ServerError('Something went wrong.', 500));
  }
};

export default getCommentById;
