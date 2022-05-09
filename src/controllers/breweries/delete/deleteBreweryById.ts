import { BreweryByIdRequestHandler } from '../types/RequestHandlers';

import Brewery from '../../../database/model/Brewery';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';

/** Business logic for deleting a beer by its id. */
const deleteBreweryById: BreweryByIdRequestHandler = async (req, res, next) => {
  try {
    const { breweryId } = req.params;

    if (!isValidUuid(breweryId)) {
      throw new ServerError(
        'Could not delete a brewery with that id as it is invalid',
        400,
      );
    }

    const breweryToDelete = await Brewery.findOne({ where: { id: breweryId } });

    if (!breweryToDelete) {
      throw new ServerError(
        `Cannot delete the brewery with id ${breweryId} as it could not be found.`,
        404,
      );
    }

    await Brewery.remove([breweryToDelete]);

    const message = breweryToDelete.beers?.length
      ? `Deleted the brewery with the id ${breweryId} and its associated beer posts.`
      : `Deleted the brewery with the id ${breweryId}`;

    const successResponse = new SuccessResponse(message, 200, {
      ...breweryToDelete,
      deleted: true,
    });

    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }
    next(new ServerError('Something went wrong.', 500));
  }
};

export default deleteBreweryById;
