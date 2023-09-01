import express from 'express';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/:categoryId/category', BookController.getByCategoryFromDb);
router.get('/:id', BookController.getByIdFromDb);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteByIdFromDb
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.updateByIdFromDb
);
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDb
);
router.get('/', BookController.getAllFromDb);

export const BookRoutes = router;
