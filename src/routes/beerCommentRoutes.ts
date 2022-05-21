import { Router } from 'express';

import createNewComment from '../controllers/comments/create/createNewComment';
import deleteCommentById from '../controllers/comments/delete/deleteCommentById';
import getAllComments from '../controllers/comments/read/getAllComments';
import getCommentById from '../controllers/comments/read/getCommentById';
import editCommentById from '../controllers/comments/update/editCommentById';
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
