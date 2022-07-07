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
import requestValidator from '../util/validation/requestValidator';

import createBeerPostJoiSchema from '../util/joi/beerPosts/createBeerPostJoiSchema';
import updateBeerPostJoiSchema from '../util/joi/beerPosts/updateBeerPostJoiSchema';
import getAllBeerPostsQueryJoiSchema from '../util/joi/beerPosts/getAllBeerPostsQueryJoiSchema';

/** Route handler for '/api/beers'. */
const beerPostRoutes = Router();

beerPostRoutes
  .route('/')
  .get(
    checkTokens,
    getCurrentUser,
    requestValidator.query(getAllBeerPostsQueryJoiSchema),
    getAllBeers,
  )
  .post(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    requestValidator.body(createBeerPostJoiSchema),
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
    requestValidator.body(updateBeerPostJoiSchema),
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
