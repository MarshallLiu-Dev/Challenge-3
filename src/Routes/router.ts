import { Request, Response, Router } from "express";
import { homeController } from "../Controller/HomeControler";
import { TutorController } from '../Controller/TutorController';

const tutorController = new TutorController();
const router: Router = Router();

router.get("/", homeController.home);
router.post("/tutors", tutorController.createTutor.bind(tutorController));
router.get("/tutors", tutorController.getTutors.bind(tutorController));

export { router };

