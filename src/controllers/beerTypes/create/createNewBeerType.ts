import { RequestHandler } from 'express-serve-static-core';
import AppDataSource from '../../../database/AppDataSource';
import BeerType from '../../../database/model/BeerType';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

type createNewBeerTypeFunction = RequestHandler<
  {},
  {},
  { name: string; description: string },
  {}
>;
const createNewBeerType: createNewBeerTypeFunction = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const { currentUser, newAccessToken } = req;

    if (!currentUser) {
      throw new ServerError('Please reauthenticate your request.', 401);
    }
    const insertQuery = await AppDataSource.createQueryBuilder()
      .insert()
      .into(BeerType)
      .values([
        {
          name,
          description,
          postedBy: currentUser,
          createdAt: new Date(Date.now()),
        },
      ])
      .execute();

    const id = insertQuery.identifiers[0].id as string;

    const routeResponse = new SuccessResponse(
      `Created a new beer type: ${name}`,
      201,
      { id, name },
      newAccessToken,
    );

    next(routeResponse);
  } catch (err) {
    next(err);
  }
};
export default createNewBeerType;
