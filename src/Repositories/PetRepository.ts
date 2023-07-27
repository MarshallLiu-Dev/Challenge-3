import Pet from "../Models/pets";

export class PetRepository {
    // Método para criar um novo Tutor no banco de dados
    async createPet(data: any) {
        try {
            // Chama o método create do modelo Tutors passando os dados recebidos
            return await Pet.create(data);
        } catch (error) {
            // Em caso de erro, lança o erro para ser tratado posteriormente
            throw error;
        }
    }

    // Método para atualizar um Tutor existente no banco de dados
    async updatePet(petId: string, updatedData: any) {
        try {
            // Chama o método findByIdAndUpdate do modelo Tutors para atualizar o Tutor com o ID fornecido
            return await Pet.findByIdAndUpdate(petId, updatedData);
        } catch (error) {
            // Em caso de erro, lança o erro para ser tratado posteriormente
            throw error;
        }
    }

    // Método para obter todos os Tutores cadastrados no banco de dados
    async findAllPet() {
        try {
            // Chama o método find do modelo Tutors para obter todos os Tutores cadastrados
            return await Pet.find();
        } catch (error) {
            // Em caso de erro, lança o erro para ser tratado posteriormente
            throw error;
        }
    }

    // Método para obter um Tutor específico pelo ID no banco de dados
    async findPetById(id: string) {
        try {
            // Chama o método findById do modelo Tutors para obter o Tutor pelo ID fornecido
            return await Pet.findById(id);
        } catch (error) {
            // Em caso de erro, lança o erro para ser tratado posteriormente
            throw error;
        }
    }

    // Método para deletar um Tutor pelo ID no banco de dados
    async deletePet(pet_id: string) {
        try {
            // Chama o método findByIdAndDelete do modelo Tutors para deletar o Tutor com o ID fornecido
            return await Pet.findByIdAndDelete(pet_id);
        } catch (error) {
            // Em caso de erro, lança o erro para ser tratado posteriormente
            throw error;
        }
    }
}