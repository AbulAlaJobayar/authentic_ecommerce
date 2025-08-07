import { Router } from 'express';
import { userRouter } from '../module/user/user.route';
import { SupplierRouter } from '../module/supplier/supplier.route';

const router = Router();

const modulesRoute = [
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/supplier',
    route: SupplierRouter,
  },
];

modulesRoute.forEach(({ path, route }) => router.use(path, route));
export default router;
