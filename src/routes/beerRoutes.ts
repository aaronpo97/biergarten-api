import express from 'express';

import createNewBeer from '../controllers/beers/create/createNewBeer';
import deleteBeerById from '../controllers/beers/delete/deleteBeerById';
import getAllBeers from '../controllers/beers/read/getAllBeers';
import getBeerById from '../controllers/beers/read/getBeerById';
import processImageData from '../controllers/beerImages/create/processImageData';
import updateBeerById from '../controllers/beers/update/updateBeerById';

import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';

import ServerError from '../util/error/ServerError';
import uploadFile from '../util/imageUpload/uploadFile';

/** Route handler for '/api/beers'. */
const beerRoutes = express.Router();

beerRoutes
  .route('/')
  .get(getAllBeers)
  .post(checkTokens, getCurrentUser, checkIfUserIsConfirmed, createNewBeer)
  .all((req, res, next) => {
    res.set('Allow', 'GET, POST');
    next(new ServerError('Not allowed', 405));
  });

beerRoutes
  .route('/:beerId/')
  .get(checkTokens, getCurrentUser, getBeerById)
  .put(updateBeerById)
  .delete(deleteBeerById)
  .all((req, res, next) => {
    res.set('Allow', 'GET, PUT, DELETE');
    next(new ServerError('Not allowed', 405));
  });

beerRoutes
  .route('/:beerId/upload-image')
  .post(checkTokens, getCurrentUser, uploadFile.array('beer-image'), processImageData)
  .all((req, res, next) => {
    res.set('Allow', 'POST');
    next(new ServerError('Not allowed', 405));
  });

export default beerRoutes;
