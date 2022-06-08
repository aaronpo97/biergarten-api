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

const commentRoutes = Router({ mergeParams: true });

commentRoutes
  .route('/')
  .get(getAllComments)
  .post(checkTokens, getCurrentUser, checkIfUserIsConfirmed, createNewComment)
  .all((req, res, next) => {
    res.set('Allow', 'GET, POST');
    next(notAllowedError);
  });

commentRoutes
  .route('/:commentId')
  .get(getCommentById)
  .delete(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    checkIfBeerCommentOwner,
    deleteCommentById,
  )
  .put(
    checkTokens,
    getCurrentUser,
    checkIfUserIsConfirmed,
    checkIfBeerCommentOwner,
    editCommentById,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, DELETE, PUT');
    next(notAllowedError);
  });

export default commentRoutes;
