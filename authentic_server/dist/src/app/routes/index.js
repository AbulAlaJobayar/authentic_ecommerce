"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const supplier_route_1 = require("../module/supplier/supplier.route");
const category_route_1 = require("../module/category/category.route");
const warehouse_route_1 = require("../module/warehouse/warehouse.route");
const auth_route_1 = require("../module/auth/auth.route");
const product_route_1 = require("../module/product/product.route");
const router = (0, express_1.Router)();
const modulesRoute = [
    {
        path: '/user',
        route: user_route_1.userRouter,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/supplier',
        route: supplier_route_1.SupplierRouter,
    },
    {
        path: '/category',
        route: category_route_1.CategoryRouter,
    },
    {
        path: '/warehouse',
        route: warehouse_route_1.WarehouseRouter,
    },
    {
        path: '/product',
        route: product_route_1.ProductRouter,
    },
];
modulesRoute.forEach(({ path, route }) => router.use(path, route));
exports.default = router;
