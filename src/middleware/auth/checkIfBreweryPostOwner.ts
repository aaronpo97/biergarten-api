import AppDataSource from '../../database/AppDataSource';
import Brewery from '../../database/model/Brewery';
import User from '../../database/model/User';
import ServerError from '../../util/error/ServerError';
import isValidUuid from '../../util/validation/isValidUuid';
import { BreweryPostMiddlewareFn } from './types/authMiddlewareTypes';

const checkIfBreweryPostOwner: BreweryPostMiddlewareFn = async (req, res, next) => {
  try {
    const { breweryId } = req.params;

    if (!isValidUuid(breweryId)) {
      throw new ServerError(
        'Could not find a brewery with that that id as it is invalid',
        404,
      );
    }

    const queriedBrewery = await AppDataSource.getRepository(Brewery)
      .createQueryBuilder('brewery')
      .where('brewery.id = :breweryId', { breweryId })
      .leftJoinAndSelect('brewery.postedBy', 'users')
      .getOne();

    if (!queriedBrewery) {
      throw new ServerError('Could not find a brewery with that id.', 404);
    }

    // @ts-expect-error
    const currentUser = req.currentUser as User;

    const isBreweryPostOwner = currentUser.id === queriedBrewery.postedBy.id;

    if (!isBreweryPostOwner) {
      throw new ServerError('You are not authorized to do that.', 403);
    }

    next();
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }
    next(new ServerError('Something went wrong', 404));
  }
};

export default checkIfBreweryPostOwner;
