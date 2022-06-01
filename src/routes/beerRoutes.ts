import express from 'express';

import createNewBeer from '../controllers/beers/create/createNewBeer';
import deleteBeerById from '../controllers/beers/delete/deleteBeerById';
import getAllBeers from '../controllers/beers/read/getAllBeers';
import getBeerById from '../controllers/beers/read/getBeerById';
import updateBeerById from '../controllers/beers/update/updateBeerById';
import checkIfBeerPostOwner from '../middleware/auth/checkIfBeerPostOwner';

import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';

import ServerError from '../util/error/ServerError';

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
  .get(getBeerById)
  .put(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    checkIfBeerPostOwner,
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
    next(new ServerError('Not allowed', 405));
  });

export default beerRoutes;
