import { Router } from 'express';
import { userRouter } from '../module/user/user.route';
import { SupplierRouter } from '../module/supplier/supplier.route';
import { CategoryRouter } from '../module/category/category.route';
import { WarehouseRouter } from '../module/warehouse/warehouse.route';
import { AuthRoute } from '../module/auth/auth.route';

const router = Router();

const modulesRoute = [
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/supplier',
    route: SupplierRouter,
  },
  {
    path: '/category',
    route: CategoryRouter,
  },
  {
    path: '/warehouse',
    route: WarehouseRouter,
  },
];

modulesRoute.forEach(({ path, route }) => router.use(path, route));
export default router;
