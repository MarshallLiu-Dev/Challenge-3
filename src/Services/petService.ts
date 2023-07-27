import { PetRepository } from "../Repositories/PetRepository";

export class PetService {
    private petRepository: PetRepository;

    // Construtor da classe, onde é criada a instância do TutorRepository
    constructor() {
        this.petRepository = new PetRepository();
    }

    // Método para criar um novo Tutor
    async createPet(data: any) {
        try {
            // Chama o método createTutor do TutorRepository para criar um novo Tutor com os dados fornecidos
            return await this.petRepository.createPet(data);
        } catch (error) {
            // Em caso de erro, lança o erro para ser tratado posteriormente
            throw error;
        }
    }

    // Método para atualizar um Tutor existente
    async updatePet(petId: string, updatedData: any) {
        try {
            // Chama o método updateTutor do TutorRepository para atualizar o Tutor com o ID fornecido
            return await this.petRepository.updatePet(petId, updatedData);
        } catch (error) {
            // Em caso de erro, lança o erro para ser tratado posteriormente
            throw error;
        }
    }

    // Método para obter todos os Tutores cadastrados
    async getPet() {
        try {
            // Chama o método findAllTutors do TutorRepository para obter todos os Tutores cadastrados
            return await this.petRepository.findAllPet();
        } catch (error) {
            // Em caso de erro, lança o erro para ser tratado posteriormente
            throw error;
        }
    }

    // Método para obter um Tutor específico pelo ID
    async getPetById(pet_id: string) {
        try {
            // Chama o método findTutorById do TutorRepository para obter o Tutor pelo ID fornecido
            return await this.petRepository.findPetById(pet_id);
        } catch (error) {
            // Em caso de erro, lança o erro para ser tratado posteriormente
            throw error;
        }
    }

    // Método para deletar um Tutor pelo ID
    async deletePet(pet_id: string) {
        try {
            // Chama o método deleteTutor do TutorRepository para deletar o Tutor com o ID fornecido
            return await this.petRepository.deletePet(pet_id);
        } catch (error) {
            // Em caso de erro, lança o erro para ser tratado posteriormente
            throw error;
        }
    }
}