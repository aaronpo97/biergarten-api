import { RequestHandler } from 'express-serve-static-core';
import Beer from '../../../database/model/Beer';
import ServerError from '../../../util/error/ServerError';
import logger from '../../../util/logger';
import SuccessResponse from '../../../util/response/SuccessResponse';

const updateBeerById: RequestHandler<
  { beerIdString: string },
  null,
  { description?: string; name?: string; abv?: number; ibu?: number }
> = async (req, res, next) => {
  try {
    const beerId = parseInt(req.params.beerIdString, 10);
    const beerToUpdate = await Beer.findOneBy({ id: beerId });
    if (!beerToUpdate) {
      throw new ServerError('Could not update that beer as it could not be found.', 404);
    }

    logger.info(beerToUpdate);

    const {
      description: updatedDescription,
      name: updatedName,
      abv: updatedAbv,
      ibu: updatedIbu,
    } = req.body;

    if (!(updatedDescription || updatedName || updatedAbv || updatedIbu)) {
      next(new ServerError('No params were given.', 400));
      return;
    }

    if (updatedDescription) {
      beerToUpdate.description = updatedDescription;
    }
    if (updatedName) {
      beerToUpdate.name = updatedName;
    }
    if (updatedAbv) {
      beerToUpdate.abv = updatedAbv;
    }
    if (updatedIbu) {
      beerToUpdate.ibu = updatedIbu;
    }

    await beerToUpdate.save();

    next(new SuccessResponse(`Updated beer id ${beerId}`, 200, beerToUpdate));
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }

    next(new Error('Something went wrong.'));
  }
};

export default updateBeerById;
