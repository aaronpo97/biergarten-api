import { Router } from 'express';

/* Controllers */

/* Middleware */
import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';

/* Utils */
import notAllowedError from '../util/error/notAllowedError';

import getResourceQueryValidator from '../util/joi/getResourceQueryValidator';

import requestValidator from '../util/validation/requestValidator';
import getAllBeerTypes from '../controllers/beerTypes/read/getAllBeerTypes';
import createNewBeerType from '../controllers/beerTypes/create/createNewBeerType';
import createBeerTypeJoiSchema from '../util/joi/beerTypes/createBeerTypeJoiSchema';
import getBeerTypeById from '../controllers/beerTypes/read/getBeerTypeById';
import checkIfBeerTypeOwner from '../middleware/auth/checkIfBeerTypeOwner';
import deleteBeerTypeById from '../controllers/beerTypes/delete/deleteBeerTypeById';

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
    requestValidator.body(createBeerTypeJoiSchema),
    createNewBeerType,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, POST');
    next(notAllowedError);
  });

beerTypeRoutes
  .route('/:id')
  .get(checkTokens, getCurrentUser, getBeerTypeById)
  .delete(checkTokens, getCurrentUser, checkIfBeerTypeOwner, deleteBeerTypeById)

  .all((req, res, next) => {
    res.set('Allow', 'GET, POST');
    next(notAllowedError);
  });

export default beerTypeRoutes;
