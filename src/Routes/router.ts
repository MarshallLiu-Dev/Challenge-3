import { Request, Response, Router } from "express";
import { homeController } from "../Controller/HomeControler";
import { TutorController } from '../Controller/TutorController';

const tutorController = new TutorController();
const router: Router = Router();

router.get("/", homeController.home);
router.post("/tutors", tutorController.createTutor.bind(tutorController));
router.get("/tutors", tutorController.getTutors.bind(tutorController));
router.get("/tutors:id", tutorController.getTutorById.bind(tutorController));
router.delete("/tutors:id", tutorController.deleteTutors.bind(tutorController));
router.put("/tutors:id", tutorController.updateTutors.bind(tutorController));



export { router };

