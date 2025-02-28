import express from 'express';
import { getUser } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/users', getUser);

export default userRouter;
