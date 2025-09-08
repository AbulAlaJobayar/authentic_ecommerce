import { Router } from 'express';
import { userRouter } from '../module/user/user.route';
import { SupplierRouter } from '../module/supplier/supplier.route';
import { CategoryRouter } from '../module/category/category.route';
import { WarehouseRouter } from '../module/warehouse/warehouse.route';
import { AuthRoute } from '../module/auth/auth.route';
import { ProductRouter } from '../module/product/product.route';
import { InventoryRouter } from '../module/inventory/inventory.route';
import { ProductBatchRouter } from '../module/batch/batch.route';
import { CartRouter } from '../module/cart/cart.route';

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
  {
    path: '/product',
    route: ProductRouter,
  },
  {
    path: '/inventory',
    route: InventoryRouter,
  },
  {
    path: '/batch',
    route: ProductBatchRouter,
  },
  {
    path: '/cart',
    route: CartRouter,
  },
];

modulesRoute.forEach(({ path, route }) => router.use(path, route));
export default router;
