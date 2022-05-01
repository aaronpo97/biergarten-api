import Brewery from '../../../database/model/Brewery';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import { UpdateBreweryRequestHandler } from '../types/RequestHandlers';

const updateBreweryById: UpdateBreweryRequestHandler = async (req, res, next) => {
  try {
    const { breweryId } = req.params;

    if (Number.isNaN(breweryId)) {
      throw new ServerError('Could not update the brewery with that id as it is invalid.', 400);
    }

    const breweryToUpdate = await Brewery.findOneBy({ id: breweryId });
    if (!breweryToUpdate) {
      throw new ServerError('Could not update that brewery as it could not be found.', 404);
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

    next(new SuccessResponse(`Updated brewery id ${breweryId}`, 200, breweryToUpdate));
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }

    next(new Error('Something went wrong.'));
  }
};

export default updateBreweryById;
