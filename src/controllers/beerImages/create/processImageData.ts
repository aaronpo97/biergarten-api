import { Express } from 'express-serve-static-core';
import BeerPost from '../../../database/model/BeerPost';
import BeerImage from '../../../database/model/BeerImage';
import ServerError from '../../../util/error/ServerError';

import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { ProcessNewImagesFn } from '../types/RequestHandlers';

/**
 * Business logic for processing image data from multer into the database.
 *
 * Takes in the beer id as a request parameter. If the provided beer id is invalid, the
 * server will throw status 400. Additionally, if no files are included in the request,
 * the server will also throw status 400. If a beer post with the provided id could not be
 * found, the server will throw status 401.
 */
const processImageData: ProcessNewImagesFn = async (req, res, next) => {
  try {
    const { beerId } = req.params;

    if (!isValidUuid(beerId)) {
      throw new ServerError('The given beer id is invalid.', 400);
    }
    const files = req.files as Express.Multer.File[] | undefined;

    if (!files?.length) {
      throw new ServerError('Nothing was provided to the file uploader.', 400);
    }

    const beerPost = await BeerPost.findOneBy({ id: beerId });

    if (!beerPost) {
      throw new ServerError(
        'Image upload failed. A post with the provided id could not be found.',
        404,
      );
    }

    const imagePromises: Array<Promise<BeerImage>> = [];

    const { currentUser } = req;
    if (!currentUser) {
      throw new ServerError('Please reauthenticate your request.', 401);
    }
    files.forEach((file) => {
      const beerImage = new BeerImage();
      beerImage.path = file.path;
      beerImage.filename = file.filename;
      beerImage.beerPost = beerPost;
      beerImage.author = currentUser;
      beerImage.caption = `Image of ${beerPost.name}.`;
      beerImage.createdAt = new Date(Date.now());
      imagePromises.push(beerImage.save());
    });

    const uploadedImages = await Promise.all(imagePromises);
    const { newAccessToken } = req;

    const successResponse = new SuccessResponse<{ uploadedImages: BeerImage[] }>(
      `Uploaded ${files.length} file${files.length === 1 ? '' : 's'}.`,
      200,
      { uploadedImages },
      newAccessToken,
    );
    next(successResponse);
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    } else {
      next(new ServerError('Something went wrong.', 500));
    }
  }
};

export default processImageData;
