import { CreateBreweryRequestHandler } from '../types/RequestHandlers';

import AppDataSource from '../../../database/AppDataSource';
import BreweryPost from '../../../database/model/BreweryPost';

import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

/**
 * Business logic for creating a new brewery.
 *
 * @throws ServerError with status 401 if there is no authenticated user appended to the
 *   request body.
 */
const createNewBrewery: CreateBreweryRequestHandler = async (req, res, next) => {
  try {
    const { description, name, location, phoneNumber } = req.body;

    const { currentUser } = req;
    if (!currentUser) {
      throw new ServerError('Please reauthenticate your request.', 401);
    }

    const insertQuery = await AppDataSource.createQueryBuilder()
      .insert()
      .into(BreweryPost)
      .values([
        {
          name,
          description,
          location,
          phoneNumber,
          postedBy: currentUser,
          createdAt: new Date(Date.now()),
        },
      ])
      .execute();

    const { newAccessToken } = req;

    const id = insertQuery.identifiers[0].id as string;

    const routeResponse = new SuccessResponse(
      'Created a new brewery.',
      201,
      { id },
      newAccessToken,
    );
    next(routeResponse);
  } catch (e) {
    next(e);
  }
};

export default createNewBrewery;
