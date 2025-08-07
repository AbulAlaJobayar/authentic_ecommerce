"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const supplier_route_1 = require("../module/supplier/supplier.route");
const router = (0, express_1.Router)();
const modulesRoute = [
    {
        path: '/user',
        route: user_route_1.userRouter,
    },
    {
        path: '/supplier',
        route: supplier_route_1.SupplierRouter,
    },
];
modulesRoute.forEach(({ path, route }) => router.use(path, route));
exports.default = router;
