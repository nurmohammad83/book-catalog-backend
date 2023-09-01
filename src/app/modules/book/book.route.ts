import express from 'express';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/:categoryId', BookController.getByCategoryFromDb);
router.get('/:id', BookController.getByIdFromDb);
router.delete('/:id', BookController.deleteByIdFromDb);
router.patch('/:id', BookController.updateByIdFromDb);
router.post('/create-book', BookController.insertIntoDb);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), BookController.getAllFromDb);

export const BookRoutes = router;
