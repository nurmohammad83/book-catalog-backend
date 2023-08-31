import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/create-book', BookController.insertIntoDb);
router.get('/', BookController.getAllFromDb);
router.get('/:id', BookController.getByIdFromDb);
router.delete('/:id', BookController.deleteByIdFromDb);
router.patch('/:id', BookController.updateByIdFromDb);

export const BookRoutes = router;
