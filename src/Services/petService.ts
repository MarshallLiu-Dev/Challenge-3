import { PetRepository } from "../Repositories/PetRepository";

export class PetService {
  private petRepository: PetRepository;

  constructor() {
    this.petRepository = new PetRepository();
  }

  // Método para criar um novo Pet
  async createPet(data: any) {
    try {
      // Chama o método createTutor do TutorRepository para criar um novo Tutor com os dados fornecidos
      return await this.petRepository.createPet(data);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para atualizar um Pet existente
  async updatePet(petId: string, updatedData: any) {
    try {
      return await this.petRepository.updatePet(petId, updatedData);
    } catch (error) {
      throw error;
    }
  }
  
  async getPet() {
    try {
      // Chama o método findAllTutors do TutorRepository para obter todos os Tutores cadastrados
      return await this.petRepository.findAllPet();
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para obter um Pet específico pelo ID
  async getPetById(petId: string) {
    try {
      return await this.petRepository.findPetById(petId);
    } catch (error) {
      throw error;
    }
  }

  // Método para deletar um Pet pelo ID
  async deletePet(petId: string) {
    try {
      return await this.petRepository.deletePet(petId);
    } catch (error) {
      throw error;
    }
  }
}
