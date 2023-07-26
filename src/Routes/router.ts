import { Request, Response, Router } from "express";
import { homeController } from "../Controller/HomeControler";

const router: Router = Router();

router.get("/", homeController.home);

export { router };