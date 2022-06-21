import { Router } from 'express';

/* Controllers */
import createNewBrewery from '../controllers/breweryPosts/create/createNewBrewery';
import deleteBreweryById from '../controllers/breweryPosts/delete/deleteBreweryById';
import getAllBreweries from '../controllers/breweryPosts/read/getAllBreweries';
import getBreweryById from '../controllers/breweryPosts/read/getBreweryById';
import updateBreweryById from '../controllers/breweryPosts/update/updateBreweryById';

/* Middleware */
import checkIfBreweryPostOwner from '../middleware/auth/checkIfBreweryPostOwner';
import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';

/* Utils */
import createBreweryValidationSchema from '../util/joi/breweryPosts/createBreweryValidationSchema';
import editBreweryPostValidationSchema from '../util/joi/breweryPosts/editBreweryPostValidationSchema';
import getResourceQueryValidator from '../util/joi/getResourceQueryValidator';
import notAllowedError from '../util/error/notAllowedError';
import requestValidator from '../util/validation/requestValidator';

const breweryPostRoutes = Router();

breweryPostRoutes
  .route('/')
  .get(
    checkTokens,
    getCurrentUser,
    requestValidator.query(getResourceQueryValidator),
    getAllBreweries,
  )
  .post(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    requestValidator.body(createBreweryValidationSchema),
    createNewBrewery,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, POST');
    next(notAllowedError);
  });

breweryPostRoutes
  .route('/:breweryId/')
  .get(checkTokens, getCurrentUser, getBreweryById)
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
    requestValidator.body(editBreweryPostValidationSchema),
    updateBreweryById,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, DELETE, PUT');
    next(notAllowedError);
  });

export default breweryPostRoutes;
