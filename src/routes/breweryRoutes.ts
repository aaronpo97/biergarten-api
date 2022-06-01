import express from 'express';

import createNewBrewery from '../controllers/breweries/create/createNewBrewery';
import deleteBreweryById from '../controllers/breweries/delete/deleteBreweryById';
import getAllBreweries from '../controllers/breweries/read/getAllBreweries';
import getBreweryById from '../controllers/breweries/read/getBreweryById';
import updateBreweryById from '../controllers/breweries/update/updateBreweryById';
import checkIfBreweryPostOwner from '../middleware/auth/checkIfBreweryPostOwner';
import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';
import ServerError from '../util/error/ServerError';

const breweryRoutes = express.Router();

breweryRoutes
  .route('/')
  .get(getAllBreweries)
  .post(checkTokens, getCurrentUser, checkIfUserIsConfirmed, createNewBrewery)
  .all((req, res, next) => {
    res.set('Allow', 'GET, POST');
    next(new ServerError('Not allowed', 405));
  });

breweryRoutes
  .route('/:breweryId/')
  .get(getBreweryById)
  .delete(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    checkIfBreweryPostOwner,
    deleteBreweryById,
  )
  .put(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    checkIfBreweryPostOwner,
    updateBreweryById,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, DELETE, PUT');
    next(new ServerError('Not allowed', 405));
  });

export default breweryRoutes;
