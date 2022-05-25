import express from 'express';

/* Middleware */
import getCurrentUser from '../middleware/auth/getCurrentUser';

/* Utils */
import ServerError from '../util/error/ServerError';

/* Controllers */
import confirmUser from '../controllers/users/edit/confirmUser';
import deleteUserById from '../controllers/users/delete/deleteUserById';
import loginUser from '../controllers/users/loginAndRegister/loginUser';
import registerUser from '../controllers/users/loginAndRegister/registerUser';
import showPublicUserInfo from '../controllers/users/read/showPublicUserInfo';
import checkTokens from '../middleware/auth/checkTokens';

const userRoutes = express.Router();

userRoutes
  .route('/register')
  .post(registerUser)
  .all((req, res, next) => {
    res.set('Allow', 'POST');
    next(new ServerError('Not allowed', 405));
  });

userRoutes
  .route('/login')
  .post(loginUser)
  .all((req, res, next) => {
    res.set('Allow', 'POST');
    next(new ServerError('Not allowed', 405));
  });

userRoutes
  .route('/confirm-user')
  .put(checkTokens, getCurrentUser, confirmUser)
  .all((req, res, next) => {
    res.set('Allow', 'PUT');
    next(new ServerError('Not allowed', 405));
  });
  
userRoutes
  .route('/:userId')
  .get(showPublicUserInfo)
  .delete(deleteUserById)
  .put(() => new ServerError('Not implemented.', 501))
  .all((req, res, next) => {
    res.set('Allow', 'GET, PUT, DELETE');
    next(new ServerError('Not allowed', 405));
  });

export default userRoutes;
