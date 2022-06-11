import { Router } from 'express';

/* Controllers */
import processImageData from '../controllers/beerImages/create/processImageData';

/* Middleware */
import checkIfBeerPostOwner from '../middleware/auth/checkIfBeerPostOwner';
import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';

/* Utils */
import uploadImage from '../util/imageUpload/uploadImage';
import notAllowedError from '../util/error/notAllowedError';
import getBeerImageById from '../controllers/beerImages/read/getImageById';
import deleteImageById from '../controllers/beerImages/delete/deleteImageById';

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

beerImageRoutes
  .route('/:imageId')
  .get(getBeerImageById)
  .delete(deleteImageById)
  .all((req, res, next) => {
    res.set('Allow', 'GET');
    next(notAllowedError);
  });

export default beerImageRoutes;
