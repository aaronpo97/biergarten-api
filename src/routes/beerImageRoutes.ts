import express from 'express';

import processImageData from '../controllers/beerImages/create/processImageData';

import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';
import checkIfBeerPostOwner from '../middleware/auth/checkIfBeerPostOwner';

import ServerError from '../util/error/ServerError';
import uploadFile from '../util/imageUpload/uploadFile';
import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';

/** Route handler for '/api/beers/:beerId/image'. */
const beerImageRoutes = express.Router({ mergeParams: true });

beerImageRoutes
  .route('/upload')
  .post(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    checkIfBeerPostOwner,
    uploadFile.array('beer-image'),
    processImageData,
  )
  .all((req, res, next) => {
    res.set('Allow', 'POST');
    next(new ServerError('Not allowed', 405));
  });

export default beerImageRoutes;
