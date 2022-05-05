import { UpdateBeerRequestHandler } from '../@types/RequestHandlers';
import Beer from '../../../database/model/Beer';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

const updateBeerById: UpdateBeerRequestHandler = async (req, res, next) => {
  try {
    const { beerId } = req.params;

    if (Number.isNaN(beerId)) {
      throw new ServerError(
        'Could not update a beer with that id as it is invalid.',
        400,
      );
    }

    const beerToUpdate = await Beer.findOneBy({ id: beerId });
    if (!beerToUpdate) {
      throw new ServerError('Could not update that beer as it could not be found.', 404);
    }

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

    const successResponse = new SuccessResponse(`Updated beer id ${beerId}`, 200, {
      updatedBeer: beerToUpdate,
      descriptionUpdated: !!updatedDescription,
      nameUpdated: !!updatedName,
      abvUpdated: !!updatedAbv,
      ibuUpdated: !!updatedIbu,
    });

    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }

    next(new Error('Something went wrong.'));
  }
};

export default updateBeerById;
