import AppDataSource from '../../../database/AppDataSource';
import BeerImage from '../../../database/model/BeerImage';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { getAllImagesFn } from '../types/RequestHandlers';

const getAllBeerImages: getAllImagesFn = async (req, res, next) => {
  try {
    const { beerId } = req.params;
    if (!isValidUuid(beerId)) {
      throw new ServerError('The provided beer id is invalid.', 400);
    }

    const beerImages = await AppDataSource.getRepository(BeerImage)
      .createQueryBuilder('beerImage')
      .leftJoinAndSelect('beerImage.beerPost', 'beerPost')
      .where('beerPost.id = :beerId', { beerId })
      .getMany();

    if (!beerImages.length) {
      throw new ServerError(
        `Either a beer post with that id does not exist, or the beer post does not have any images.`,
        404,
      );
    }

    const { newAccessToken } = req;

    const response = new SuccessResponse(
      `Getting all images for beer post with id ${beerId}.`,
      200,
      beerImages,
      newAccessToken,
    );
    next(response);
  } catch (error) {
    next(error);
  }
};

export default getAllBeerImages;
