import {Router} from 'express';
import controller from './queryController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const queryRouter = new Router();

queryRouter.post('/generate-query', [
    authMiddleware,
], controller.generateQuery.bind(controller));

export default queryRouter;