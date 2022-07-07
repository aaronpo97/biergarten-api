import { Router } from 'express';

/* Middleware */
import getCurrentUser from '../middleware/auth/getCurrentUser';

/* Controllers */
import checkIfCurrentUser from '../middleware/auth/checkIfCurrentUser';
import checkTokens from '../middleware/auth/checkTokens';
import confirmUser from '../controllers/users/edit/confirmUser';
import deleteUserById from '../controllers/users/delete/deleteUserById';
import editEmail from '../controllers/users/edit/editEmail';
import editUsername from '../controllers/users/edit/editUsername';
import loginUser from '../controllers/users/loginAndRegister/loginUser';
import registerUser from '../controllers/users/loginAndRegister/registerUser';
import resendConfirmationEmail from '../controllers/users/loginAndRegister/resendConfirmationEmail';
import showPublicUserInfo from '../controllers/users/read/showPublicUserInfo';

/* Utils */
import notAllowedError from '../util/error/notAllowedError';
import requestValidator from '../util/validation/requestValidator';
import registerUserJoiSchema from '../util/joi/users/registerUserJoiSchema';
import loginUserJoiSchema from '../util/joi/users/loginUserJoiSchema';
import confirmUserJoiSchema from '../util/joi/users/confirmUserJoiSchema';
import editUsernameJoiSchema from '../util/joi/users/editUsernameJoiSchema';
import editEmailJoiSchema from '../util/joi/users/editEmailJoiSchema';
import getAuthenticatedUser from '../controllers/users/read/getAuthenticatedUser';
import checkIfEmailExists from '../controllers/users/read/checkIfEmailExists';
import checkIfUsernameExists from '../controllers/users/read/checkIfUsernameExists';

const userRoutes = Router();

userRoutes
  .route('/current-authenticated-user')
  .get(checkTokens, getCurrentUser, getAuthenticatedUser)
  .all((req, res, next) => {
    res.set('Allow', 'GET');
    next(notAllowedError);
  });

userRoutes
  .route('/check-if-username-exists')
  .get(checkIfUsernameExists)
  .all((req, res, next) => {
    res.set('Allow', 'GET');
    next(notAllowedError);
  });

userRoutes
  .route('/check-if-email-exists')
  .get(checkIfEmailExists)
  .all((req, res, next) => {
    res.set('Allow', 'GET');
    next(notAllowedError);
  });

userRoutes
  .route('/register')
  .post(requestValidator.body(registerUserJoiSchema), registerUser)
  .all((req, res, next) => {
    res.set('Allow', 'POST');
    next(notAllowedError);
  });

userRoutes
  .route('/login')
  .post(requestValidator.body(loginUserJoiSchema), loginUser)
  .all((req, res, next) => {
    res.set('Allow', 'POST');
    next(notAllowedError);
  });

userRoutes
  .route('/confirm-user')
  .put(
    requestValidator.body(confirmUserJoiSchema),
    checkTokens,
    getCurrentUser,
    confirmUser,
  )
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
  .put(
    requestValidator.body(editUsernameJoiSchema),
    checkTokens,
    getCurrentUser,
    checkIfCurrentUser,
    editUsername,
  )
  .all((req, res, next) => {
    res.set('Allow', 'PUT');
    next(notAllowedError);
  });

userRoutes
  .route('/:userId/edit-email')
  .put(
    requestValidator.body(editEmailJoiSchema),
    checkTokens,
    getCurrentUser,
    checkIfCurrentUser,
    editEmail,
  )
  .all((req, res, next) => {
    res.set('Allow', 'GET, PUT');
    next(notAllowedError);
  });

export default userRoutes;
