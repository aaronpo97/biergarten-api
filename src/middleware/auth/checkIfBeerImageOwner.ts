import { ImageByIdFn } from '../../controllers/beerImages/types/RequestHandlers';
import AppDataSource from '../../database/AppDataSource';
import BeerImage from '../../database/model/BeerImage';
import ServerError from '../../util/error/ServerError';
import isValidUuid from '../../util/validation/isValidUuid';

const checkIfBeerImageOwner: ImageByIdFn = async (req, res, next) => {
  try {
    const { beerId, imageId } = req.params;

    if (!isValidUuid(beerId)) {
      throw new ServerError('The provided beer id is invalid.', 400);
    }
    if (!isValidUuid(imageId)) {
      throw new ServerError('The provided image id is invalid.', 400);
    }

    const { currentUser } = req;

    if (!currentUser) {
      throw new ServerError('Please reauthenticate your request.', 401);
    }

    const beerImage = await AppDataSource.getRepository(BeerImage)
      .createQueryBuilder('beerImage')
      .leftJoinAndSelect('beerImage.author', 'author')
      .where('beerImage.id = :imageId', { imageId })
      .getOne();

    if (!beerImage) {
      throw new ServerError('Could not find a beer image with that id.', 404);
    }

    if (beerImage.author.id !== currentUser.id) {
      throw new ServerError('You are not authorized to do that.', 401);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default checkIfBeerImageOwner;
