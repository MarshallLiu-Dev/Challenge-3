// Importações necessárias do Express e do Service relacionado ao Tutor
import { Request, Response } from 'express';
import { TutorService } from '../Services/TutorService';

// Controller do Tutor, responsável por lidar com as requisições relacionadas aos Tutores
export class TutorController {
  // Instância do Service relacionado ao Tutor
  private tutorService: TutorService;

  // Construtor da classe, onde é criada a instância do TutorService
  constructor() {
    this.tutorService = new TutorService();
  }

  // Método para criar um novo Tutor
  async createTutor(req: Request, res: Response) {
    const bodyData = req.body;
    try {
      // Chama o método createTutor do TutorService para criar um novo Tutor
      const newTutor = await this.tutorService.createTutor(bodyData);
      // Retorna a resposta com o novo Tutor criado e uma mensagem de sucesso
      return res.status(201).json({ newTutor, message: 'Tutor created successfully' });
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  // Método para atualizar um Tutor existente
  async updateTutor(req: Request, res: Response) {
    const { id } = req.params; // Obtém o ID do Tutor a ser atualizado dos parâmetros da URL
    const updatedData = req.body; // Obtém os dados atualizados do corpo da requisição

    try {
      // Chama o método updateTutor do TutorService para atualizar o Tutor com o ID fornecido
      const updatedTutor = await this.tutorService.updateTutor(id, updatedData);

      if (!updatedTutor) {
        // Caso o Tutor não seja encontrado, retorna uma resposta com uma mensagem de erro
        return res.status(404).json({ message: 'Tutor not found' });
      }

      // Retorna a resposta com o Tutor atualizado e uma mensagem de sucesso
      return res.status(200).json({ updatedTutor, message: 'Tutor updated successfully' });
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  // Método para obter todos os Tutores cadastrados
  // async getTutors(req: Request, res: Response) {
  //   try {
  //     // Chama o método getTutors do TutorService para obter todos os Tutores cadastrados
  //     const tutors = await this.tutorService.getTutors();
  //     // Retorna a resposta com a lista de Tutores e um status de sucesso
  //     return res.status(200).json(tutors);
  //   } catch (error) {
  //     // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
  //     return res.status(500).json({ error, message: 'Internal server error' });
  //   }
  // }


  async getTutors(req: Request, res: Response) {
  try {
    const tutorWithPets = await TutorService.getTutorWithPets();
    return res.status(200).json(tutorWithPets);
  } catch (error) {
    return res.status(500).json({ error, message: 'Internal server error' });
  }
}

  // Método para obter um Tutor específico pelo ID
  async getTutorById(req: Request, res: Response) {
    const { id } = req.params; // Obtém o ID do Tutor a ser buscado dos parâmetros da URL

    try {
      // Chama o método getTutorById do TutorService para obter o Tutor pelo ID fornecido
      const tutor = await this.tutorService.getTutorById(id);

      if (!tutor) {
        // Caso o Tutor não seja encontrado, retorna uma resposta com uma mensagem de erro
        return res.status(404).json({ message: 'Tutor not found' });
      }

      // Retorna a resposta com o Tutor encontrado e um status de sucesso
      return res.status(200).json(tutor);
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  // Método para deletar um Tutor pelo ID
  async deleteTutor(req: Request, res: Response) {
    const { id } = req.params; // Obtém o ID do Tutor a ser deletado dos parâmetros da URL

    try {
      // Chama o método deleteTutor do TutorService para deletar o Tutor com o ID fornecido
      const deletedTutor = await this.tutorService.deleteTutor(id);

      if (!deletedTutor) {
        // Caso o Tutor não seja encontrado, retorna uma resposta com uma mensagem de erro
        return res.status(404).json({ message: 'Tutor not found' });
      }

      // Retorna a resposta com um status de sucesso, já que o Tutor foi deletado com sucesso
      return res.status(204).json({ message: 'Tutor deleted successfully' });
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }
}