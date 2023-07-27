// Importações necessárias do Express e do Service relacionado ao Pet
import { Request, Response } from 'express';
import { PetService } from '../Services/petService';

// Controller do Pet, responsável por lidar com as requisições relacionadas aos Petes
export class PetController {
    private petService: PetService;
    // Construtor da classe, onde é criada a instância do petService
    constructor() {
        this.petService = new PetService();
    }

    // Método para criar um novo Pet
    async createPet(req: Request, res: Response) {
        const bodyData = req.body;
        try {
            // Chama o método createPet do petService para criar um novo Pet
            const newPet = await this.petService.createPet(bodyData);
            // Retorna a resposta com o novo Pet criado e uma mensagem de sucesso
            return res.status(201).json({ newPet, message: 'Pet created successfully' });
        } catch (error) {
            // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
            return res.status(400).json({ error, message: 'Request error, check and try again' });
        }
    }

    // Método para atualizar um Pet existente
    async updatePet(req: Request, res: Response) {
        const { id } = req.params; // Obtém o ID do Pet a ser atualizado dos parâmetros da URL
        const updatedData = req.body; // Obtém os dados atualizados do corpo da requisição

        try {
            // Chama o método updatePet do PetService para atualizar o Pet com o ID fornecido
            const updatedPet = await this.petService.updatePet(id, updatedData);

            if (!updatedPet) {
                // Caso o Pet não seja encontrado, retorna uma resposta com uma mensagem de erro
                return res.status(404).json({ message: 'Pet not found' });
            }

            // Retorna a resposta com o Pet atualizado e uma mensagem de sucesso
            return res.status(200).json({ updatedPet, message: 'Pet updated successfully' });
        } catch (error) {
            // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
            return res.status(400).json({ error, message: 'Request error, check and try again' });
        }
    }

    // Método para obter todos os Pet cadastrados
    async getPet(req: Request, res: Response) {
        try {
            // Chama o método getPet do PetService para obter todos os Petes cadastrados
            const pet = await this.petService.getPet();
            // Retorna a resposta com a lista de Petes e um status de sucesso
            return res.status(200).json(pet);
        } catch (error) {
            // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
            return res.status(500).json({ error, message: 'Internal server error' });
        }
    }

    // Método para obter um Pet específico pelo ID
    async getPetById(req: Request, res: Response) {
        const { id } = req.params; // Obtém o ID do Pet a ser buscado dos parâmetros da URL

        try {
            // Chama o método getPetById do PetService para obter o Pet pelo ID fornecido
            const pet = await this.petService.getPetById(id);

            if (!pet) {
                // Caso o Pet não seja encontrado, retorna uma resposta com uma mensagem de erro
                return res.status(404).json({ message: 'Pet not found' });
            }

            // Retorna a resposta com o Pet encontrado e um status de sucesso
            return res.status(200).json(pet);
        } catch (error) {
            // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
            return res.status(400).json({ error, message: 'Request error, check and try again' });
        }
    }

    // Método para deletar um Pet pelo ID
    async deletePet(req: Request, res: Response) {
        const { id } = req.params; // Obtém o ID do Pet a ser deletado dos parâmetros da URL

        try {
            // Chama o método deletePet do PetService para deletar o Pet com o ID fornecido
            const deletedPet = await this.petService.deletePet(id);

            if (!deletedPet) {
                // Caso o Pet não seja encontrado, retorna uma resposta com uma mensagem de erro
                return res.status(404).json({ message: 'Pet not found' });
            }

            // Retorna a resposta com um status de sucesso, já que o Pet foi deletado com sucesso
            return res.status(204).json({ message: 'Pet deleted successfully' });
        } catch (error) {
            // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
            return res.status(400).json({ error, message: 'Request error, check and try again' });
        }
    }
}

