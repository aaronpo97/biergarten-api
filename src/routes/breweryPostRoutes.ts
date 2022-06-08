import { Router } from 'express';

/* Controllers */
import createNewBrewery from '../controllers/breweries/create/createNewBrewery';
import deleteBreweryById from '../controllers/breweries/delete/deleteBreweryById';
import getAllBreweries from '../controllers/breweries/read/getAllBreweries';
import getBreweryById from '../controllers/breweries/read/getBreweryById';
import updateBreweryById from '../controllers/breweries/update/updateBreweryById';

/* Middleware */
import checkIfBreweryPostOwner from '../middleware/auth/checkIfBreweryPostOwner';
import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';

/* Utils */
import notAllowedError from '../util/error/notAllowedError';

const breweryPostRoutes = Router();

breweryPostRoutes
  .route('/')
  .get(getAllBreweries)
  .post(checkTokens, getCurrentUser, checkIfUserIsConfirmed, createNewBrewery)
  .all((req, res, next) => {
    res.set('Allow', 'GET, POST');
    next(notAllowedError);
  });

breweryPostRoutes
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
    next(notAllowedError);
  });

export default breweryPostRoutes;
