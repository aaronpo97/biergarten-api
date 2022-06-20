import { UpdateBeerRequestHandler } from '../types/RequestHandlers';
import BeerPost from '../../../database/model/BeerPost';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
/**
 * Business logic for updating a beer by its id.
 *
 * Takes in the beer id as part of request params and an option updated description, name,
 * abv, or ibu as part of the request body.
 *
 * If the provided beer post id is invalid, the server will throw error 400. Additionally,
 * the server will throw error 404 if a beer with the provided id could not be located.
 *
 * If the request body is empty, then the server will throw error 400 citing that no
 * updated params were given to the server and could not complete the request.
 */
const updateBeerById: UpdateBeerRequestHandler = async (req, res, next) => {
  try {
    const { beerId } = req.params;

    if (!isValidUuid(beerId)) {
      throw new ServerError(
        'Could not update a beer with that id as it is invalid.',
        400,
      );
    }

    const beerToUpdate = await BeerPost.findOneBy({ id: beerId });
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

    const newAccessToken = req.newAccessToken as string | undefined;

    const successResponse = new SuccessResponse(
      `Updated beer id ${beerId}`,
      200,
      {
        updatedBeer: beerToUpdate,
        descriptionUpdated: !!updatedDescription,
        nameUpdated: !!updatedName,
        abvUpdated: !!updatedAbv,
        ibuUpdated: !!updatedIbu,
      },
      newAccessToken,
    );

    next(successResponse);
  } catch (e) {
    if (e instanceof Error) {
      next(e);
    }

    next(new Error('Something went wrong.'));
  }
};

export default updateBeerById;
