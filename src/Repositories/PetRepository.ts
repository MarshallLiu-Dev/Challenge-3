import Pet from "../Models/pets";

export class PetRepository {
    // Método para criar um novo Pet no banco de dados
    async createPet(data: any) {
        try {
            return await Pet.create(data);
        } catch (error) {
            throw error;
        }
    }

    // Método para atualizar um Pet existente no banco de dados
    async updatePet(petId: string, updatedData: any) {
        try {
            return await Pet.findByIdAndUpdate(petId, updatedData);
        } catch (error) {
            throw error;
        }
    }
        async findAllPet() {
            try {
                // Chama o método find do modelo Tutors para obter todos os Tutores cadastrados
                return await Pet.find();
            } catch (error) {
                // Em caso de erro, lança o erro para ser tratado posteriormente
                throw error;
            }
        }

    // Método para obter um Pet específico pelo ID no banco de dados
    async findPetById(petId: string) {
        try {
            return await Pet.findById(petId);
        } catch (error) {
            throw error;
        }
    }

    // Método para deletar um Pet pelo ID no banco de dados
    async deletePet(petId: string) {
        try {
            return await Pet.findByIdAndDelete(petId);
        } catch (error) {
            throw error;
        }
    }
}
