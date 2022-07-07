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
import createBeerCommentJoiSchema from '../util/joi/beerComments/createBeerCommentJoiSchema';
import updateBeerCommentJoiSchema from '../util/joi/beerComments/updateBeerCommentJoiSchema';
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
    requestValidator.body(createBeerCommentJoiSchema),
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
    requestValidator.body(updateBeerCommentJoiSchema),
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
