import express from 'express';
import registerUser from '../controllers/users/loginAndRegister/registerUser';
import loginUser from '../controllers/users/loginAndRegister/loginUser';
import showPublicUserInfo from '../controllers/users/read/showPublicUserInfo';
import ServerError from '../util/error/ServerError';
import deleteUserById from '../controllers/users/delete/deleteUserById';

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
  .route('/:userId')
  .get(showPublicUserInfo)
  .delete(deleteUserById)
  .put(() => new ServerError('Not implemented.', 501))
  .all((req, res, next) => {
    res.set('Allow', 'GET, PUT, DELETE');
    next(new ServerError('Not allowed', 405));
  });

export default userRoutes;
