import { Router } from 'express';

import { createValidator } from 'express-joi-validation';

/* Controllers */
import createNewBeer from '../controllers/beerPosts/create/createNewBeer';
import deleteBeerById from '../controllers/beerPosts/delete/deleteBeerById';
import getAllBeers from '../controllers/beerPosts/read/getAllBeers';
import getBeerById from '../controllers/beerPosts/read/getBeerById';
import updateBeerById from '../controllers/beerPosts/update/updateBeerById';

/* Middleware */
import checkIfBeerPostOwner from '../middleware/auth/checkIfBeerPostOwner';
import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';

/* Utils */
import notAllowedError from '../util/error/notAllowedError';
import createBeerPostValidationSchema from '../util/joi/beerPosts/createBeerPostValidationSchema';
import getResourceQueryValidator from '../util/joi/getResourceQueryValidator';
import updateBeerPostValidationSchema from '../util/joi/beerPosts/updateBeerPostValidationSchema';
import requestValidator from '../util/validation/requestValidator';

/** Route handler for '/api/beers'. */
const beerPostRoutes = Router();

beerPostRoutes
  .route('/')
  .get(
    checkTokens,
    getCurrentUser,
    requestValidator.query(getResourceQueryValidator),
    getAllBeers,
  )
  .post(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    requestValidator.body(createBeerPostValidationSchema),
    createNewBeer,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, POST');
    next(notAllowedError);
  });

beerPostRoutes
  .route('/:beerId/')
  .get(checkTokens, getCurrentUser, getBeerById)
  .put(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    checkIfBeerPostOwner,
    requestValidator.body(updateBeerPostValidationSchema),
    updateBeerById,
  )
  .delete(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    checkIfBeerPostOwner,
    deleteBeerById,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, PUT, DELETE');
    next(notAllowedError);
  });

export default beerPostRoutes;
