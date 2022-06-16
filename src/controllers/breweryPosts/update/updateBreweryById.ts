import BreweryPost from '../../../database/model/BreweryPost';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { UpdateBreweryRequestHandler } from '../types/RequestHandlers';

/**
 * Business logic for updating a brewery by its id.
 *
 * Takes in the brewery id as the req params. If the brewery id is not a valid UUID it
 * will throw ServerError with code 400.
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
