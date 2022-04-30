import { RequestHandler } from 'express';
import Beer from '../../../database/model/Beer';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

const deleteBeerById: RequestHandler<{ beerIdString: string }, null, null> = async (req, res, next) => {
  try {
    const { beerIdString } = req.params;
    const beerId = parseInt(beerIdString, 10);

    if (Number.isNaN(beerId)) {
      throw new ServerError('Could not delete a beer with that id as it is invalid.', 400);
    }

    const beerToDelete = await Beer.findOneBy({ id: beerId });

    if (!beerToDelete) {
      throw new ServerError(`Cannot delete the beer with id ${beerId} as it could not be found.`, 404);
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
