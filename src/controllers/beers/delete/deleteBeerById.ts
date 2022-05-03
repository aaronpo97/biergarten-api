import { validate as isValidUUID } from 'uuid';
import { BeerByIdRequestHandler } from '../@types/RequestHandlers';
import Beer from '../../../database/model/Beer';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

const deleteBeerById: BeerByIdRequestHandler = async (req, res, next) => {
  try {
    const { beerId } = req.params;

    if (!isValidUUID(beerId)) {
      throw new ServerError('Could not delete the beer with that id as it is invalid', 400);
    }

    const beerToDelete = await Beer.findOne({
      where: { id: beerId },
      join: { alias: 'beer', leftJoinAndSelect: { brewery: 'beer.brewery' } },
    });

    if (!beerToDelete) {
      throw new ServerError(
        `Cannot delete the beer with id ${beerId} as it could not be found.`,
        404,
      );
    }

    await Beer.remove([beerToDelete]);

    const successResponse = new SuccessResponse(
      `Successfully deleted the beer with id ${beerId}.`,
      200,
      { ...beerToDelete, deleted: true },
    );

    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }
    next(new ServerError('Something went wrong.', 500));
  }
};

export default deleteBeerById;
