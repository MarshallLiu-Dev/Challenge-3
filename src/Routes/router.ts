import { Request, Response, Router } from "express";
import { homeController } from "../Controller/HomeControler";
import { TutorController } from '../Controller/TutorController';
import { PetController } from "../Controller/PetController";

const tutorController = new TutorController();
const router: Router = Router();
const petController = new PetController();

//Rotas para o tutor
router.get("/", homeController.home);
router.post('/tutor', tutorController.createTutor.bind(tutorController));
router.get('/tutors', tutorController.getTutors.bind(tutorController));
router.get('/tutor/:tutorId', tutorController.getTutorById.bind(tutorController));
router.delete('/tutor/:tutorId', tutorController.deleteTutor.bind(tutorController));
router.put('/tutor/:tutorId', tutorController.updateTutor.bind(tutorController));

//Rotas para o pet
router.post("/pet/:tutorId", petController.createPet.bind(petController));
router.put("/pet/:petId/tutor/:tutorId", petController.updatePet.bind(petController));
router.get("/pet", petController.getPet.bind(petController));
router.get("/pet/:petId", petController.getPetById.bind(petController));
router.delete("/pet/:petId/tutor/:tutorId", petController.deletePet.bind(petController));



export { router };


