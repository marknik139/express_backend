import {Router} from 'express';
import controller from './userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const authRouter = new Router();

authRouter.get('/users', [
    authMiddleware,
    roleMiddleware(['ADMIN']),
], controller.getUsers);

authRouter.get('/:username', [
    authMiddleware,
], controller.getUser);

export default authRouter;