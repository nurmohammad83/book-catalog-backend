import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { CowsRoutes } from '../modules/cows/cow.route';
import { OrderRoutes } from '../modules/orders/order.route';
import { AuthRoutes } from '../modules/auth/auth.route';
const router = express.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/cows',
    route: CowsRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
