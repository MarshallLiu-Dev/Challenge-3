import { TutorRepository } from "../Repositories/TutorRepository";

export class TutorService {
  private tutorRepository: TutorRepository;

  // Construtor da classe, onde é criada a instância do TutorRepository
  constructor() {
    this.tutorRepository = new TutorRepository();
  }

  // Método para criar um novo Tutor
  async createTutor(data: any) {
    try {
      // Chama o método createTutor do TutorRepository para criar um novo Tutor com os dados fornecidos
      return await this.tutorRepository.createTutor(data);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para atualizar um Tutor existente
  async updateTutor(id: string, updatedData: any) {
    try {
      // Chama o método updateTutor do TutorRepository para atualizar o Tutor com o ID fornecido
      return await this.tutorRepository.updateTutor(id, updatedData);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para obter todos os Tutores cadastrados
  async getTutors() {
    try {
      // Chama o método findAllTutors do TutorRepository para obter todos os Tutores cadastrados
      return await this.tutorRepository.findAllTutors();
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para obter um Tutor específico pelo ID
  async getTutorById(tutors_id: string) {
    try {
      // Chama o método findTutorById do TutorRepository para obter o Tutor pelo ID fornecido
      return await this.tutorRepository.findTutorById(tutors_id);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para deletar um Tutor pelo ID
  async deleteTutor(tutors_id: string) {
    try {
      // Chama o método deleteTutor do TutorRepository para deletar o Tutor com o ID fornecido
      return await this.tutorRepository.deleteTutor(tutors_id);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }
}