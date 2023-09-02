import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { BookRoutes } from '../modules/book/book.route';
import { OrderRoutes } from '../modules/order/order.route';
import { ProfileRoutes } from '../modules/profile/profile.route';
const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
