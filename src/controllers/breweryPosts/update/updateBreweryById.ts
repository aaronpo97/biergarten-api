import BreweryPost from '../../../database/model/BreweryPost';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { UpdateBreweryRequestHandler } from '../types/RequestHandlers';

/**
 * Business logic for updating a brewery by its id.
 *
 * Takes in the brewery id as the req params.
 *
 * @throws ServerError with status 400 (Bad Request) if the client provided brewery id is
 *   not a valid UUID.
 * @throws SeverError with status 404 (Not Found) if a brewery_post with the client
 *   provided id could not be found.
 */
const updateBreweryById: UpdateBreweryRequestHandler = async (req, res, next) => {
  try {
    const { breweryId } = req.params;

    if (!isValidUuid(breweryId)) {
      throw new ServerError(
        'Could not update the brewery with that id as it is invalid.',
        400,
      );
    }

    const breweryToUpdate = await BreweryPost.findOneBy({ id: breweryId });
    if (!breweryToUpdate) {
      throw new ServerError(
        'Could not update that brewery as it could not be found.',
        404,
      );
    }

    const {
      description: updatedDescription,
      name: updatedName,
      location: updatedLocation,
    } = req.body;

    if (!(updatedDescription || updatedName || updatedLocation)) {
      next(new ServerError('No params were given.', 400));
      return;
    }

    if (updatedDescription) {
      breweryToUpdate.description = updatedDescription;
    }
    if (updatedName) {
      breweryToUpdate.name = updatedName;
    }

    if (updatedLocation) {
      breweryToUpdate.location = updatedLocation;
    }
    breweryToUpdate.modifiedAt = new Date(Date.now());

    await breweryToUpdate.save();

    const { newAccessToken } = req;
    const successResponse = new SuccessResponse(
      `Updated brewery id ${breweryId}`,
      200,
      breweryToUpdate,
      newAccessToken,
    );
    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }

    next(new Error('Something went wrong.'));
  }
};

export default updateBreweryById;
