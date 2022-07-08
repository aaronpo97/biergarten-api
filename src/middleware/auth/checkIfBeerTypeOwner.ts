import { RequestHandler } from 'express-serve-static-core';
import AppDataSource from '../../database/AppDataSource';
import BeerType from '../../database/model/BeerType';
import ServerError from '../../util/error/ServerError';

type checkIfBeerTypeOwnerFunction = RequestHandler<{ id: string }, {}, {}, {}>;
const checkIfBeerTypeOwner: checkIfBeerTypeOwnerFunction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const queriedType = await AppDataSource.getRepository(BeerType)
      .createQueryBuilder('beerType')
      .select(['beerType', 'user.id', 'user.username'])
      .innerJoin('beerType.postedBy', 'user')
      .where('beerType.id = :id', { id })
      .getOne();

    if (!queriedType) {
      throw new ServerError('Cannot find a beer type with that id.', 404);
    }

    const { currentUser } = req;

    if (!currentUser) {
      throw new ServerError('Please authenticate your request.', 404);
    }

    if (queriedType.postedBy.id !== currentUser.id) {
      throw new ServerError('You are not allowed to do that.', 403);
    }

    next();
  } catch (e) {
    next(e);
  }
};
export default checkIfBeerTypeOwner;
