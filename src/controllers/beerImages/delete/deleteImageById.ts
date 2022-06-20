import AppDataSource from '../../../database/AppDataSource';
import BeerImage from '../../../database/model/BeerImage';
import ServerError from '../../../util/error/ServerError';
import deleteImageHelper from '../../../util/imageUpload/deleteImageHelper';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { ImageByIdFn } from '../types/RequestHandlers';

const deleteImageById: ImageByIdFn = async (req, res, next) => {
  try {
    const { beerId, imageId } = req.params;

    if (!isValidUuid(beerId)) {
      throw new ServerError('The provided beer id is invalid.', 400);
    }
    if (!isValidUuid(imageId)) {
      throw new ServerError('The provided image id is invalid.', 400);
    }

    const beerImage = await AppDataSource.getRepository(BeerImage)
      .createQueryBuilder('beerImage')
      .leftJoinAndSelect('beerImage.beerPost', 'beerPost')
      .where('beerImage.id = :imageId', { imageId })
      .getOne();

    if (!beerImage) {
      throw new ServerError('A beer image with that id could not be located.', 404);
    }

    await deleteImageHelper(beerImage);

    const { newAccessToken } = req;
    const response = new SuccessResponse(
      `Deleting the beer image with id ${imageId}`,
      200,
      beerImage,
      newAccessToken,
    );
    next(response);
  } catch (error) {
    next(error);
  }
};

export default deleteImageById;
