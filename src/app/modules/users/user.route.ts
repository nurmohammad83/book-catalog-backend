import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.insertIntoDb);

export const UserRoutes = router;
