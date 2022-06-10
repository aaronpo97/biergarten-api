import { Router } from 'express';

/* Controllers */
import createNewBreweryReview from '../controllers/brewery-reviews/create/createNewBreweryReview';
import deleteBreweryReviewById from '../controllers/brewery-reviews/delete/deleteBreweryReviewById';
import editBreweryReviewById from '../controllers/brewery-reviews/update/editBreweryReviewById';
import getAllBreweryReviews from '../controllers/brewery-reviews/read/getAllBreweryReviews';
import getBreweryReviewById from '../controllers/brewery-reviews/read/getBreweryReviewById';

/* Middleware */
import checkIfBreweryReviewOwner from '../middleware/auth/checkIfBreweryReviewOwner';
import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';

/* Utils */
import notAllowedError from '../util/error/notAllowedError';

/** Route handler for '/api/beers'. */
const breweryReviewRoutes = Router({ mergeParams: true });

breweryReviewRoutes
  .route('/')
  .get(getAllBreweryReviews)
  .post(checkTokens, getCurrentUser, checkIfUserIsConfirmed, createNewBreweryReview)
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
    editBreweryReviewById,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, DELETE, PUT');
    next(notAllowedError);
  });

export default breweryReviewRoutes;
