import { Express } from 'express-serve-static-core';
import Beer from '../../../database/model/Beer';
import BeerImage from '../../../database/model/BeerImage';
import User from '../../../database/model/User';
import ServerError from '../../../util/error/ServerError';

import SuccessResponse from '../../../util/response/SuccessResponse';
import isValidUuid from '../../../util/validation/isValidUuid';
import { ProcessImageDataFn } from '../@types/RequestHandlers';

const processImageData: ProcessImageDataFn = async (req, res, next) => {
  try {
    const { beerId } = req.params;

    if (!isValidUuid(beerId)) {
      throw new ServerError('The given beer id is invalid.', 400);
    }
    const files = req.files as Express.Multer.File[] | undefined;

    if (!files?.length) {
      throw new ServerError('Nothing was provided to the file uploader.', 400);
    }

    const beerPost = await Beer.findOneBy({ id: beerId });

    if (!beerPost) {
      throw new ServerError(
        'Image upload failed. A post with the provided id could not be found.',
        404,
      );
    }

    const imagePromises: Array<Promise<BeerImage>> = [];

    //  @ts-expect-error
    const currentUser = req.currentUser as User;
    files.forEach((file) => {
      const beerImage = new BeerImage();
      beerImage.path = file.path;
      beerImage.beerPost = beerPost;
      beerImage.author = currentUser;
      imagePromises.push(beerImage.save());
    });

    const uploadedImages = await Promise.all(imagePromises);

    // @ts-expect-error
    const newAccessToken = req.newAccessToken as string | undefined;

    next(
      new SuccessResponse<{ uploadedImages: BeerImage[] }>(
        `Uploaded ${files.length} file${files.length === 1 ? '' : 's'}.`,
        200,
        { uploadedImages },
        newAccessToken,
      ),
    );
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    } else {
      next(new ServerError('Something went wrong.', 500));
    }
  }
};

export default processImageData;
