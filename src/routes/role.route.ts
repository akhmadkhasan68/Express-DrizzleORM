import express from 'express';
import { getRoles } from '../controllers/role.controller';

const roleRouter = express.Router();

roleRouter.get('/roles', getRoles);

export default roleRouter;
