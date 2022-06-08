import { Router } from 'express';

/* Middleware */
import getCurrentUser from '../middleware/auth/getCurrentUser';

/* Controllers */
import confirmUser from '../controllers/users/edit/confirmUser';
import deleteUserById from '../controllers/users/delete/deleteUserById';
import loginUser from '../controllers/users/loginAndRegister/loginUser';
import registerUser from '../controllers/users/loginAndRegister/registerUser';
import showPublicUserInfo from '../controllers/users/read/showPublicUserInfo';
import checkTokens from '../middleware/auth/checkTokens';
import resendConfirmationEmail from '../controllers/users/loginAndRegister/resendConfirmationEmail';
import notAllowedError from '../util/error/notAllowedError';
import checkIfCurrentUser from '../middleware/auth/checkIfCurrentUser';
import editUsername from '../controllers/users/edit/editUsername';
import editEmail from '../controllers/users/edit/editEmail';

const userRoutes = Router();

userRoutes
  .route('/register')
  .post(registerUser)
  .all((req, res, next) => {
    res.set('Allow', 'POST');
    next(notAllowedError);
  });

userRoutes
  .route('/login')
  .post(loginUser)
  .all((req, res, next) => {
    res.set('Allow', 'POST');
    next(notAllowedError);
  });

userRoutes
  .route('/confirm-user')
  .put(checkTokens, getCurrentUser, confirmUser)
  .all((req, res, next) => {
    res.set('Allow', 'PUT');
    next(notAllowedError);
  });

userRoutes
  .route('/resend-confirmation-email')
  .get(checkTokens, getCurrentUser, checkIfCurrentUser, resendConfirmationEmail)
  .all((req, res, next) => {
    res.set('Allow', 'GET');
    next(notAllowedError);
  });

userRoutes
  .route('/:userId')
  .get(showPublicUserInfo)
  .delete(checkTokens, getCurrentUser, checkIfCurrentUser, deleteUserById)
  .all((req, res, next) => {
    res.set('Allow', 'GET, DELETE');
    next(notAllowedError);
  });

userRoutes
  .route('/:userId/edit-username')
  .put(checkTokens, getCurrentUser, checkIfCurrentUser, editUsername)
  .all((req, res, next) => {
    res.set('Allow', 'PUT');
    next(notAllowedError);
  });

userRoutes
  .route('/:userId/edit-email')
  .put(checkTokens, getCurrentUser, checkIfCurrentUser, editEmail)
  .all((req, res, next) => {
    res.set('Allow', 'GET, PUT');
    next(notAllowedError);
  });

export default userRoutes;
