import isValidUuid from '../../../util/validation/isValidUuid';
import { BeerByIdRequestHandler } from '../types/RequestHandlers';
import BeerPost from '../../../database/model/BeerPost';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import AppDataSource from '../../../database/AppDataSource';

/**
 * Business logic for deleting a beer post by its id.
 *
 * @throws ServerError with status 400 if the client provided beer id is invalid.
 * @throws ServerError with status 404 if a beer post with the client provided id could
 *   not be found.
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

    const beerToDelete = await AppDataSource.createQueryBuilder()
      .delete()
      .from(BeerPost)
      .where('id = :id', { id: beerId })
      .execute();

    if (!beerToDelete.affected) {
      throw new ServerError(
        `Cannot delete the beer with id ${beerId} as it could not be found.`,
        404,
      );
    }

    const newAccessToken = req.newAccessToken as string | undefined;

    const successResponse = new SuccessResponse(
      `Successfully deleted the beer with id ${beerId}.`,
      200,
      undefined,
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
