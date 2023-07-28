// Importações necessárias do Express e do Service relacionado ao Tutor
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TutorService } from '../Services/TutorService';
import Tutor from '../Models/tutors';

// Controller do Tutor, responsável por lidar com as requisições relacionadas aos Tutores
export class TutorController {
  // Instância do Service relacionado ao Tutor
  private tutorService: TutorService;

  // Construtor da classe, onde é criada a instância do TutorService
  constructor() {
    this.tutorService = new TutorService();
  }

  async authenticateTutor(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // Busca o tutor pelo email no banco de dados
      const tutor = await Tutor.findOne({ email });

      if (!tutor) {
        // Caso o tutor não seja encontrado, retorna uma resposta com uma mensagem de erro
        return res.status(404).json({ message: 'Tutor not found' });
      }

      // Verifica se a senha fornecida corresponde à senha criptografada no banco de dados
      const isPasswordValid = await bcrypt.compare(password, tutor.password);

      if (!isPasswordValid) {
        // Caso a senha seja inválida, retorna uma resposta com uma mensagem de erro
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Se a autenticação for bem-sucedida, você pode gerar um token de acesso
      const accessToken = jwt.sign({ _id: tutor._id }, 'suaChaveSecreta', {
        expiresIn: '1h', // Defina o tempo de expiração do token, por exemplo, 1 hora
      });

      // Retorna o token de acesso na resposta
      return res.status(200).json({ access_token: accessToken });
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(500).json({ error, message: 'Internal server error' });
    }
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
    const { tutorId } = req.params; // Obtém o ID do Tutor a ser atualizado dos parâmetros da URL
    const updatedData = req.body; // Obtém os dados atualizados do corpo da requisição

    try {
      // Chama o método updateTutor do TutorService para atualizar o Tutor com o ID fornecido
      const updatedTutor = await this.tutorService.updateTutor(tutorId, updatedData);

      if (!updatedTutor) {
        // Caso o Tutor não seja encontrado, retorna uma resposta com uma mensagem de erro
        return res.status(404).json({ message: 'Tutor not found' });
      }

      // Retorna a resposta com o Tutor atualizado e uma mensagem de sucesso
      return res.status(200).json({ updatedData, message: 'Tutor updated successfully' });
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(400).json({ error, message: 'Request error, check and try again' });
    }
  }

  // Método para obter todos os Tutores cadastrados
  async getTutors(req: Request, res: Response) {
    try {
      // Chama o método do serviço para obter todos os tutores com seus pets associados
      const tutorsWithPets = await this.tutorService.getTutors();

      // Retorna a resposta com a lista de tutores e seus pets associados
      return res.status(200).json({ tutorsWithPets, message: 'Listing All Tutors and Pets' });
    } catch (error) {
      // Em caso de erro, retorna uma resposta com o erro e uma mensagem de falha
      return res.status(500).json({ error, message: 'Internal server error' });
    }
  }

  // Método para obter um Tutor específico pelo ID (não é um endpoint HTTP)
  async getTutorById(req: Request, res: Response) {
    const { tutorId } = req.params; // Obtém o ID do Tutor a ser buscado dos parâmetros da URL

    try {
      // Chama o método getTutorById do TutorService para obter o Tutor pelo ID fornecido
      const tutor = await this.tutorService.getTutorById(tutorId);

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


  // // Método para deletar um Tutor pelo ID

  async deleteTutor(req: Request, res: Response) {
    const { tutorId } = req.params;

    try {
      const deletedTutor = await this.tutorService.deleteTutor(tutorId);

      if (!deletedTutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }

      return res.status(204).json({ message: 'Tutor deleted successfully' });
    } catch (error: any) {
      if (error.message === 'Tutor has pets associated') {
        return res.status(403).json({ message: 'Tutor has pets associated and cannot be deleted' });
      }

      return res.status(400).json({ message: 'Request error, check and try again, Tutor has pets associated and cannot be deleted' });
    }
  }
}