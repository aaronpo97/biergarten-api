import { Router } from 'express';

import createNewComment from '../controllers/beer-comments/create/createNewBeerComment';
import deleteCommentById from '../controllers/beer-comments/delete/deleteBeerCommentById';
import getAllComments from '../controllers/beer-comments/read/getAllBeerComments';
import getCommentById from '../controllers/beer-comments/read/getBeerCommentById';
import editCommentById from '../controllers/beer-comments/update/editBeerCommentById';
import checkIfBeerCommentOwner from '../middleware/auth/checkIfBeerCommentOwner';
import checkIfUserIsConfirmed from '../middleware/auth/checkIfUserIsConfirmed';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';
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
