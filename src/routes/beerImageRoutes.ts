import { Router } from 'express';

import processImageData from '../controllers/beerImages/create/processImageData';

import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';
import checkIfBeerPostOwner from '../middleware/auth/checkIfBeerPostOwner';

import uploadImage from '../util/imageUpload/uploadImage';
import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';
import notAllowedError from '../util/error/notAllowedError';

/** Route handler for '/api/beers/:beerId/image'. */
const beerImageRoutes = Router({ mergeParams: true });

beerImageRoutes
  .route('/upload')
  .post(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    checkIfBeerPostOwner,
    uploadImage.array('beer-image'),
    processImageData,
  )
  .all((req, res, next) => {
    res.set('Allow', 'POST');
    next(notAllowedError);
  });

export default beerImageRoutes;
