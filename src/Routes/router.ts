import { Request, Response, Router } from "express";
import { homeController } from "../Controller/HomeControler";
import { TutorController } from '../Controller/TutorController';
import { PetController } from "../Controller/PetController";
import AuthController from './../Controller/Auth';
import AuthMiddleware from './../Middlewares/authMiddleware'

const tutorController = new TutorController();
const router: Router = Router();
const petController = new PetController();

//Rotas para o tutor
router.get("/", homeController.home);
// Rota para autenticação
router.post('/login', AuthController.Login );

router.post('/tutor', tutorController.createTutor.bind(tutorController));
router.get('/tutors',AuthMiddleware, tutorController.getTutors.bind(tutorController));
router.get('/tutor/:tutorId',AuthMiddleware, tutorController.getTutorById.bind(tutorController));
router.delete('/tutor/:tutorId',AuthMiddleware, tutorController.deleteTutor.bind(tutorController));
router.put('/tutor/:tutorId',AuthMiddleware, tutorController.updateTutor.bind(tutorController));

//Rotas para o pet
router.post("/pet/:tutorId",AuthMiddleware, petController.createPet.bind(petController));
router.put("/pet/:petId/tutor/:tutorId",AuthMiddleware, petController.updatePet.bind(petController));
router.get("/pet",AuthMiddleware, petController.getPet.bind(petController));
router.get("/pet/:petId",AuthMiddleware, petController.getPetById.bind(petController));
router.delete("/pet/:petId/tutor/:tutorId",AuthMiddleware, petController.deletePet.bind(petController));



export { router };


