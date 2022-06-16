import { Router } from 'express';

/* Controllers */
import createNewComment from '../controllers/beerComments/create/createNewBeerComment';
import deleteCommentById from '../controllers/beerComments/delete/deleteBeerCommentById';
import editCommentById from '../controllers/beerComments/update/editBeerCommentById';
import getAllComments from '../controllers/beerComments/read/getAllBeerComments';
import getCommentById from '../controllers/beerComments/read/getBeerCommentById';

/* Middleware */
import checkIfBeerCommentOwner from '../middleware/auth/checkIfBeerCommentOwner';
import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';

/* Utils */
import notAllowedError from '../util/error/notAllowedError';
import requestValidator from '../util/validation/requestValidator';
import createBeerCommentValidationSchema from '../util/joi/beerComments/createBeerCommentValidationSchema';
import updateBeerCommentValidationSchema from '../util/joi/beerComments/updateBeerCommentValidationSchema';
import getResourceQueryValidator from '../util/joi/getResourceQueryValidator';

const commentRoutes = Router({ mergeParams: true });

commentRoutes
  .route('/')
  .get(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    requestValidator.query(getResourceQueryValidator),
    getAllComments,
  )
  .post(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    requestValidator.body(createBeerCommentValidationSchema),
    createNewComment,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, POST');
    next(notAllowedError);
  });

commentRoutes
  .route('/:commentId')
  .get(checkTokens, getCurrentUser, checkIfUserIsConfirmed, getCommentById)
  .put(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    checkIfBeerCommentOwner,
    requestValidator.body(updateBeerCommentValidationSchema),
    editCommentById,
  )
  .delete(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    checkIfBeerCommentOwner,
    deleteCommentById,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, DELETE, PUT');
    next(notAllowedError);
  });

export default commentRoutes;
