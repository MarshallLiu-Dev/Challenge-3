import Tutors from "../Models/tutors";

export class TutorRepository {
  // Método para criar um novo Tutor no banco de dados
  async createTutor(data: any) {
    try {
      // Chama o método create do modelo Tutors passando os dados recebidos
      return await Tutors.create(data);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para atualizar um Tutor existente no banco de dados
  async updateTutor(tutorId: string, updatedData: any) {
    try {
      // Chama o método findByIdAndUpdate do modelo Tutors para atualizar o Tutor com o ID fornecido
      return await Tutors.findByIdAndUpdate(tutorId, updatedData);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para obter todos os Tutores cadastrados no banco de dados
  async findAllTutors() {
    try {
      // Chama o método find do modelo Tutors para obter todos os Tutores cadastrados
      return await Tutors.find().select('-password').populate('pets').exec();;
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para obter um Tutor específico pelo ID no banco de dados
  async findTutorById(tutorId: string) {
    try {
      // Chama o método findById do modelo Tutors para obter o Tutor pelo ID fornecido
      return await Tutors.findById(tutorId);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }

  // Método para deletar um Tutor pelo ID no banco de dados
  async deleteTutor(tutorId: string) {
    try {
      // Chama o método findByIdAndDelete do modelo Tutors para deletar o Tutor com o ID fornecido
      return await Tutors.findByIdAndDelete(tutorId);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }
}