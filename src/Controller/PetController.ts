import { Request, Response } from 'express';
import { PetService } from '../Services/petService';
import { TutorService } from '../Services/TutorService';
import Tutors from '../Models/tutors';


export class PetController {
    private petService: PetService;
    private tutorService: TutorService;
    // Construtor da classe, onde é criada a instância do petService
    constructor() {
        this.petService = new PetService();
        this.tutorService = new TutorService();
    }

    // Método para criar um novo Pet
        async createPet(req: Request, res: Response) {
            const { tutorId } = req.params;
            const bodyData = req.body;

            try {
                const tutor = await this.tutorService.getTutorById(tutorId);
                if (!tutor) {
                    return res.status(404).json({
                        error: true,
                        code: 404,
                        message: `No tutor with id ${tutorId}`,
                    });
                }

                // Create the new pet
                const newPet = await this.petService.createPet(bodyData);

                // Associate the new pet with the tutor by adding its ID to the tutor's pets array
                tutor.pets.push(newPet._id);
                await tutor.save();

                // Return the response with the newly created pet and tutorId
                return res.status(201).json({ newPet, tutorId: tutor._id, message: 'Pet created and associated with tutor successfully' });
            } catch (error) {
                return res.status(400).json({ error, message: 'Request error, check and try again' });
            }
        }

    // Método para atualizar um Pet existente
    async updatePet(req: Request, res: Response) {
        const { petId } = req.params;
        const updatedData = req.body;

        try {
            const updatedPet = await this.petService.updatePet(petId, updatedData);

            if (!updatedPet) {
                return res.status(404).json({ message: 'Pet not found' });
            }

            return res.status(200).json({ updatedData, message: 'Pet updated successfully' });
        } catch (error) {
            return res.status(400).json({ error, message: 'Request error, check and try again' });
        }
    }

    // Método para obter todos os Pets cadastrados, com os tutores associados
    async getPet(req: Request, res: Response) {
        try {
            // Chama o método getPet do PetService para obter a lista de pets
            const pets = await this.petService.getPet();

            // Retorna a resposta com a lista de pets e um status de sucesso
            return res.status(200).json({ pets, message: 'Listing All Pets' });
        } catch (error) {
            // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
            return res.status(400).json({ error, message: 'Request error, check and try again' });
        }
    }

    // Método para obter um Pet específico pelo ID
    async getPetById(req: Request, res: Response) {
        const { petId } = req.params;

        try {
            const pet = await this.petService.getPetById(petId);

            
            if (!pet) {
                return res.status(404).json({ message: 'Pet not found' });
            }

            return res.status(200).json(pet);
        } catch (error) {
            return res.status(400).json({ error, message: 'Request error, check and try again' });
        }
    }

    // Método para deletar um Pet pelo ID
    async deletePet(req: Request, res: Response) {
        const { petId, tutorId } = req.params;

        try {
            const tutor = await this.tutorService.getTutorById(tutorId);
            //const tutor = await Tutors.findById(tutorId);
          
            if (!tutor) {
              return res.status(404).json({
                error: true,
                code: 404,
                message: `No tutor with id ${tutorId}`,
              });
            }
            
            const index = tutor.pets.findIndex((pet: any) => pet.id === petId);
            
            const del = tutor.pets.splice(index, 1);
           // findByIdAndUpdate pegando direto da model, não passa pelo service nem pelo repository
            const tutorAtualizado = await Tutors.findByIdAndUpdate(
              tutorId,
              { $pull: { pets: del[0] } },
              { new: true }
            );
            if (!tutorAtualizado) {
              return res
                .status(404)
                .json({
                  error: true,
                  code: 404,
                  message: `error updating tutor with id ${tutorId}`,
                });
            }

            const deletedPet = await this.petService.deletePet(petId);

            if (!deletedPet) {
                return res.status(404).json({ message: 'Pet not found' });
            }

            return res.status(204).json({ message: 'Pet deleted successfully' });
        } catch (error) {
            return res.status(400).json({ error, message: 'Request error, check and try again' });
        }
    }
}
