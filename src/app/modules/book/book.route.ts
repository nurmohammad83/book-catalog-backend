import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/:categoryId', BookController.getByCategoryFromDb);
router.get('/:id', BookController.getByIdFromDb);
router.delete('/:id', BookController.deleteByIdFromDb);
router.patch('/:id', BookController.updateByIdFromDb);
router.post('/create-book', BookController.insertIntoDb);
router.get('/', BookController.getAllFromDb);

export const BookRoutes = router;
