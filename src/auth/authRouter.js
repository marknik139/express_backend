import {Router} from 'express';
import controller from './authController.js';
import {check} from 'express-validator';

const authRouter = new Router();

authRouter.post('/registration', [
    check('username', 'Username can not be empty').notEmpty(),
    check('password', 'Password should be longer than 4 characters and shorter than 10').isLength({min: 4, max: 10}),
], controller.registration);

authRouter.post('/login', controller.login);

export default authRouter;