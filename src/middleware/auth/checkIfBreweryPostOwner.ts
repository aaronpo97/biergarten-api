import AppDataSource from '../../database/AppDataSource';
import BreweryPost from '../../database/model/BreweryPost';
import ServerError from '../../util/error/ServerError';
import isValidUuid from '../../util/validation/isValidUuid';
import { BreweryPostMiddlewareFn } from './types/authMiddlewareTypes';

/**
 * Middleware function to check if the currently authenticated user is the resource owner.
 *
 * This function must be invoked after the checkTokens, getCurrentUser, and
 * checkIfUserIsConfirmed functions. Otherwise the server will throw an error.
 *
 * @throws ServerError with status 400 (Bad Request) when the provided brewery_post id is
 *   not a UUID.
 * @throws ServerError with status 403 (Forbidden) when currentUser.id !==
 *   queriedBrewery.postedBy.id. This means the currently authenticated user is not
 *   authorized to modify the resource.
 */

const checkIfBreweryPostOwner: BreweryPostMiddlewareFn = async (req, res, next) => {
  try {
    const { breweryId } = req.params;

    if (!isValidUuid(breweryId)) {
      throw new ServerError(
        'Could not find a brewery with that id as it is invalid',
        400,
      );
    }

    const queriedBrewery = await AppDataSource.getRepository(BreweryPost)
      .createQueryBuilder('brewery')
      .where('brewery.id = :breweryId', { breweryId })
      .leftJoinAndSelect('brewery.postedBy', 'users')
      .getOne();

    if (!queriedBrewery) {
      throw new ServerError('Could not find a brewery with that id.', 404);
    }

    const { currentUser } = req;
    if (!currentUser) {
      throw new ServerError('You must authenticate your request.', 401);
    }

    const isBreweryPostOwner = currentUser.id === queriedBrewery.postedBy.id;

    if (!isBreweryPostOwner) {
      throw new ServerError('You are not authorized to do that.', 403);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default checkIfBreweryPostOwner;
