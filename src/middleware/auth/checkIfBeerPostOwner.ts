import { RequestHandler } from 'express-serve-static-core';
import AppDataSource from '../../database/AppDataSource';
import Beer from '../../database/model/Beer';
import User from '../../database/model/User';
import ServerError from '../../util/error/ServerError';
import isValidUuid from '../../util/validation/isValidUuid';
import { BeerPostMiddlewareFn } from './types/authMiddlewareTypes';

const checkIfBeerPostOwner: BeerPostMiddlewareFn = async (req, res, next) => {
  try {
    const { beerId } = req.params;

    if (!isValidUuid(beerId)) {
      throw new ServerError(
        'Could not find a beer post with that id as it is invalid.',
        400,
      );
    }

    // @ts-expect-error
    const currentUser = req.currentUser as User;

    if (!currentUser) {
      throw new ServerError(
        'The current user could not be determined, please reauthenticate.',
        401,
      );
    }

    const queriedBeer = await AppDataSource.getRepository(Beer)
      .createQueryBuilder('beer')
      .leftJoinAndSelect('beer.postedBy', 'user')
      .where('beer.id = :beerId', { beerId })
      .getOne();

    if (!queriedBeer) {
      throw new ServerError('Could not find a beer post with that id.', 404);
    }

    const isPostOwner = currentUser.id === queriedBeer.postedBy.id;

    if (!isPostOwner) {
      throw new ServerError('You are not authorized to do that.', 403);
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new ServerError('Something went wrong.', 500));
    }
  }
};

export default checkIfBeerPostOwner;
