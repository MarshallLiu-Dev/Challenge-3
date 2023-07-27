import { Request, Response, Router } from "express";
import { homeController } from "../Controller/HomeControler";
import { TutorController } from '../Controller/TutorController';
import { PetController } from "../Controller/PetController";

const tutorController = new TutorController();
const router: Router = Router();
const petController = new PetController();

//Rotas para o tutor
router.get("/", homeController.home);
router.post('/tutors', tutorController.createTutor.bind(tutorController));
router.get('/tutors', tutorController.getTutors.bind(tutorController));
router.get('/tutors/:id', tutorController.getTutorById.bind(tutorController));
router.delete('/tutors/:id', tutorController.deleteTutor.bind(tutorController));
router.put('/tutors/:id', tutorController.updateTutor.bind(tutorController));

//Rotas para o pet
router.post("/pet/:tutorId", petController.createPet.bind(petController));
router.put("/pet/:id", petController.updatePet.bind(petController));
router.get("/pets", petController.getPet.bind(petController));
router.get("/pet/:id", petController.getPetById.bind(petController));
router.delete("/pet/:id", petController.deletePet.bind(petController));



export { router };


