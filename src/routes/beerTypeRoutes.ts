import { Router } from 'express';

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

import getResourceQueryValidator from '../util/joi/getResourceQueryValidator';

import requestValidator from '../util/validation/requestValidator';
import getAllBeerTypes from '../controllers/beerTypes/read/getAllBeerTypes';
import createNewBeerType from '../controllers/beerTypes/create/createNewBeerType';
import createBeerTypeValidationSchema from '../util/joi/beerTypes/createBeerTypeValidationSchema';

/** Route handler for '/api/beer-types'. */
const beerTypeRoutes = Router();

beerTypeRoutes
  .route('/')
  .get(
    checkTokens,
    getCurrentUser,
    requestValidator.query(getResourceQueryValidator),
    getAllBeerTypes,
  )
  .post(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    requestValidator.body(createBeerTypeValidationSchema),
    createNewBeerType,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, POST');
    next(notAllowedError);
  });

export default beerTypeRoutes;
