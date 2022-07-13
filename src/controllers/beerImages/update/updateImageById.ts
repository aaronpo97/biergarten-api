import BeerImage from '../../../database/model/BeerImage';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { EditBeerImageFn } from '../types/RequestHandlers';

/**
 * Business logic for updating a beer image by id.
 *
 * @throws ServerError with status 400 if the client provided beer post id is invalid.
 * @throws ServerError with status 400 if the client provided beer image id is invalid.
 * @throws ServerError with status 404 if the server could not locate a beer image with
 *   the client provided id.
 */

const updateImageById: EditBeerImageFn = async (req, res, next) => {
  try {
    const { beerId, imageId } = req.params;

    const { newAccessToken } = req;

    if (!isValidUuid(beerId)) {
      throw new ServerError('The provided beer id is invalid.', 400);
    }
    if (!isValidUuid(imageId)) {
      throw new ServerError('The provided image id is invalid.', 400);
    }

    const { updatedCaption } = req.body;

    if (!updatedCaption) {
      next(
        new SuccessResponse('No updates were provided to the server.', 200, undefined),
      );
      return;
    }

    const beerImage = await BeerImage.findOne({ where: { id: imageId } });

    if (!beerImage) {
      throw new ServerError('Could not find a beer image with that id.', 404);
    }

    beerImage.caption = updatedCaption;

    beerImage.modifiedAt = new Date(Date.now());
    await beerImage.save();
    const successResponse = new SuccessResponse(
      `Updated the beer image with id ${imageId}.`,
      200,
      beerImage,
      newAccessToken,
    );
    next(successResponse);
  } catch (err) {
    next(err);
  }
};

export default updateImageById;
