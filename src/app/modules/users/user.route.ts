import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getAllFromDb);
router.get('/:id', UserController.getAllFromDb);
router.delete('/:id', UserController.deleteByIdFromDb);
router.patch('/:id', UserController.updateByIdFromDb);

export const UserRoutes = router;
