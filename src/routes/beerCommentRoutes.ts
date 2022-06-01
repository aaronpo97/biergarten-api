import { Router } from 'express';

import createNewComment from '../controllers/beer-comments/create/createNewBeerComment';
import deleteCommentById from '../controllers/beer-comments/delete/deleteBeerCommentById';
import getAllComments from '../controllers/beer-comments/read/getAllBeerComments';
import getCommentById from '../controllers/beer-comments/read/getBeerCommentById';
import editCommentById from '../controllers/beer-comments/update/editBeerCommentById';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';

const commentRoutes = Router({ mergeParams: true });

commentRoutes
  .route('/')
  .get(getAllComments)
  .post(checkTokens, getCurrentUser, createNewComment);

commentRoutes
  .route('/:commentId')
  .get(getCommentById)
  .delete(deleteCommentById)
  .put(editCommentById);

export default commentRoutes;
