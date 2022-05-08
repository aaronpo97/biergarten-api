import { Router } from 'express';

import createNewComment from '../controllers/comments/create/createNewComment';
import getAllComments from '../controllers/comments/read/getAllComments';
import checkTokens from '../middleware/auth/checkTokens';
import getCurrentUser from '../middleware/auth/getCurrentUser';

const commentRoutes = Router({ mergeParams: true });

commentRoutes
  .route('/')
  .get(getAllComments)
  .post(checkTokens, getCurrentUser, createNewComment);

export default commentRoutes;
