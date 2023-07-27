import { Request, Response } from "express";
import  Pet  from "../Models/pets";
import Tutors  from "../Models/tutors";

export const PetController = {
    async createPet(req: Request, res: Response) {
        const bodyData = req.body;
        const { tutors_id } = req.params;

        try {
            const data = { Tutors: tutors_id, ...bodyData };

            const newPet = await Pet.create(data);
            await newPet.populate('tutors');

            return res
                .status(201)
                .json({ newPet, message: 'Pet created successfully' });
        } catch (error) {
            return res
                .status(400)
                .json({ error, message: 'Request error. Please check and try again.' });
        }
    },

    async getPet(req: Request, res: Response) {
        const { tutors_id } = req.params;

        try {
            const petOfUser = await Pet.find({ tutors: tutors_id }).populate('tutors');

            if (!petOfUser || petOfUser.length === 0) {
                return res.status(404).json({ message: 'No pets found for the tutors' });
            }

            return res
                .status(200)
                .json({ petOfUser, message: 'Listing all your pets' });
        } catch (error) {
            return res.status(500).json({ error, message: 'Internal server error' });
        }
    },

    async updatePet(req: Request, res: Response) {
        const bodyData = req.body;
        const { pet_id, tutors_id } = req.params;

        try {
            const updatePet = await Pet.findByIdAndUpdate(pet_id, bodyData, {
                new: true,
            });
            if (!updatePet)
                return res.status(404).send({ message: 'Pet does not exist' });
            return res.status(200).json(updatePet);
        } catch (error) {
            return res
                .status(400)
                .json({ error, message: 'Request error. Please check and try again.' });
        }
    },

    async deletePet(req: Request, res: Response) {
        const { pet_id, tutors_id } = req.params;

        try {
            const deletePet = await Pet.findByIdAndDelete(pet_id);

            return res.status(204).json({ deletePet, message: 'Delete successful' });
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    async getAllPets(req: Request, res: Response) {
        try {
            const pet = await Pet.find();
            return res.status(200).json(pet);
        } catch (error) {
            return res.status(400).json(error);
        }
    },
};