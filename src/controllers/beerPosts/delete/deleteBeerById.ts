import isValidUuid from '../../../util/validation/isValidUuid';
import { BeerByIdRequestHandler } from '../types/RequestHandlers';
import BeerPost from '../../../database/model/BeerPost';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

/**
 * Business logic for deleting a beer post by its id.
 *
 * Takes in the beer post id as part of the request params and will throw error 400 if a
 * beer post with the provided id is invalid. Will also throw error 404 if a beer post
 * with the provided id could not be found.
 */
const deleteBeerById: BeerByIdRequestHandler = async (req, res, next) => {
  try {
    const { beerId } = req.params;

    if (!isValidUuid(beerId)) {
      throw new ServerError(
        'Could not delete the beer with that id as it is invalid',
        400,
      );
    }

    const beerToDelete = await BeerPost.findOne({
      where: { id: beerId },
      join: { alias: 'beer', leftJoinAndSelect: { brewery: 'beer.brewery' } },
    });

    if (!beerToDelete) {
      throw new ServerError(
        `Cannot delete the beer with id ${beerId} as it could not be found.`,
        404,
      );
    }

    await BeerPost.remove([beerToDelete]);

    const newAccessToken = req.newAccessToken as string | undefined;

    const successResponse = new SuccessResponse(
      `Successfully deleted the beer with id ${beerId}.`,
      200,
      { ...beerToDelete, deleted: true },
      newAccessToken,
    );

    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }
    next(new ServerError('Something went wrong.', 500));
  }
};

export default deleteBeerById;
