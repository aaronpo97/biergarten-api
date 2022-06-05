import { Router } from 'express';

import createNewComment from '../controllers/beer-comments/create/createNewBeerComment';
import deleteCommentById from '../controllers/beer-comments/delete/deleteBeerCommentById';
import getAllComments from '../controllers/beer-comments/read/getAllBeerComments';
import getCommentById from '../controllers/beer-comments/read/getBeerCommentById';
import editCommentById from '../controllers/beer-comments/update/editBeerCommentById';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';
import ServerError from '../util/error/ServerError';

const commentRoutes = Router({ mergeParams: true });

commentRoutes
  .route('/')
  .get(getAllComments)
  .post(checkTokens, getCurrentUser, createNewComment)
  .all((req, res, next) => {
    res.set('Allow', 'GET, POST');
    next(new ServerError('Not allowed', 405));
  });

commentRoutes
  .route('/:commentId')
  .get(getCommentById)
  .delete(deleteCommentById)
  .put(editCommentById)
  .all((req, res, next) => {
    res.set('Allow', 'GET, DELETE, PUT');
    next(new ServerError('Not allowed', 405));
  });

export default commentRoutes;
