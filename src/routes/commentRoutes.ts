import { Router } from 'express';

import createNewComment from '../controllers/comments/create/createNewComment';
import getAllComments from '../controllers/comments/read/getAllComments';

const commentRoutes = Router({ mergeParams: true });

commentRoutes.route('/').get(getAllComments).post(createNewComment);

export default commentRoutes;
