import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/create-category', CategoryController.insertIntoDb);
router.get('/', CategoryController.getAllFromDb);
router.get('/:id', CategoryController.getByIdFromDb);
router.delete('/:id', CategoryController.deleteByIdFromDb);
router.patch('/:id', CategoryController.updateByIdFromDb);

export const CategoryRoutes = router;
