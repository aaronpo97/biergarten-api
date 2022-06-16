import { Router } from 'express';

/* Controllers */
import createNewBreweryReview from '../controllers/breweryReviews/create/createNewBreweryReview';
import deleteBreweryReviewById from '../controllers/breweryReviews/delete/deleteBreweryReviewById';
import editBreweryReviewById from '../controllers/breweryReviews/update/editBreweryReviewById';
import getAllBreweryReviews from '../controllers/breweryReviews/read/getAllBreweryReviews';
import getBreweryReviewById from '../controllers/breweryReviews/read/getBreweryReviewById';

/* Middleware */
import checkIfBreweryReviewOwner from '../middleware/auth/checkIfBreweryReviewOwner';
import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';

/* Utils */
import createBreweryReviewValidationSchema from '../util/joi/breweryReview/createBreweryReviewValidationSchema';
import editBreweryReviewValidationSchema from '../util/joi/breweryReview/editBreweryReviewValidationSchema';
import getResourceQueryValidator from '../util/joi/getResourceQueryValidator';
import notAllowedError from '../util/error/notAllowedError';
import requestValidator from '../util/validation/requestValidator';

/** Route handler for '/api/beers'. */
const breweryReviewRoutes = Router({ mergeParams: true });

breweryReviewRoutes
  .route('/')
  .get(
    checkTokens,
    getCurrentUser,
    requestValidator.query(getResourceQueryValidator),
    getAllBreweryReviews,
  )
  .post(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    requestValidator.body(createBreweryReviewValidationSchema),
    createNewBreweryReview,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, POST');
    next(notAllowedError);
  });

breweryReviewRoutes
  .route('/:reviewId')
  .get(getBreweryReviewById)
  .delete(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    checkIfBreweryReviewOwner,
    deleteBreweryReviewById,
  )
  .put(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    checkIfBreweryReviewOwner,
    requestValidator.body(editBreweryReviewValidationSchema),
    editBreweryReviewById,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, DELETE, PUT');
    next(notAllowedError);
  });

export default breweryReviewRoutes;
