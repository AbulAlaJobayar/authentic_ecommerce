import { Router } from "express";
import { userRouter } from "../module/user/user.route";

const router = Router();

const modulesRoute = [
  {
    path: "/user",
    route: userRouter,
  },
];

modulesRoute.forEach(({path,route})=>router.use(path,route))
export default router
