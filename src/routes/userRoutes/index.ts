import express from 'express';
import registerUser from '../../controllers/users/loginAndRegister/registerUser';
import loginUser from '../../controllers/users/loginAndRegister/loginUser';
import showPublicUserInfo from '../../controllers/users/read/showPublicUserInfo';

const userRoutes = express.Router();

userRoutes.route('/:userId').get(showPublicUserInfo);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/login').post(loginUser);

export default userRoutes;
