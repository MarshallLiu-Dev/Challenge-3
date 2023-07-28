import Pet from '../Models/pets';
import Tutor from '../Models/tutors';
import { TutorRepository } from "../Repositories/TutorRepository";

export class TutorService {
  private tutorRepository: TutorRepository;

  // Construtor da classe, onde é criada a instância do TutorRepository
  constructor() {
    this.tutorRepository = new TutorRepository();
  }

  async getTutors() {
    try {
      // Utilize o método find do modelo Tutor para obter todos os tutores cadastrados
      // e use o método populate para carregar os detalhes dos pets associados
      return await this.tutorRepository.findAllTutors();
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
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
  async updateTutor(tutorId: string, updatedData: any) {
    try {
      // Chama o método updateTutor do TutorRepository para atualizar o Tutor com o ID fornecido
      return await this.tutorRepository.updateTutor(tutorId, updatedData);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }


  
  // Método para obter um Tutor específico pelo ID com o Populate

  async getTutorById(tutorId: string) {
    try {
  // Use o método findById do modelo Tutor para obter o Tutor pelo ID fornecido
  //     // Adicione o método populate('pets') para carregar os detalhes dos pets associados
    return await Tutor.findById(tutorId).populate('pets').exec();
       // return await Tutor.find().populate('pets').exec();
   } catch (error) {
  // Em caso de erro, lança o erro para ser tratado posteriormente
       throw error;
     }
  }

  // Método para deletar um Tutor pelo ID
  async deleteTutor(tutorId: string) {
    try {
      // Verifica se o tutor existe no banco de dados
      const tutor = await Tutor.findById(tutorId);
      if (!tutor) {
        throw new Error('Tutor not found');
      }

      // Verifica se o tutor possui pets associados
      if (tutor.pets.length > 0) {
        throw new Error('Tutor has pets associated and cannot be deleted');
      }

      // Caso o tutor não tenha pets associados, pode prosseguir com a exclusão
      return await Tutor.findByIdAndDelete(tutorId);
    } catch (error) {
      // Em caso de erro, lança o erro para ser tratado posteriormente
      throw error;
    }
  }
  
}















  // async getTutorWithPets() {
  //   try {const tutors = await this.tutorRepository.findAllTutors();
  //     const tutorWithPets = [];
  
  //     for (const tutor of tutors) {
  //       const pets = await Pet.find({ tutors: tutor._id });
  //       const formattedPets = pets.map(
  //         (pet: Partial<{
  //           _id: any;
  //           name: any;
  //           species: any;
  //           carry: any;
  //           weight: any;
  //           date_of_birth: any;
  //         }>) => ({
  //           id: pet._id,
  //           name: pet.name,
  //           species: pet.species,
  //           carry: pet.carry,
  //           weight: pet.weight,
  //           date_of_birth: pet.date_of_birth,
  //         }),
  //       );
  
  //       tutorWithPets.push({
  //         id: tutor._id,
  //         name: tutor.name,
  //         phone: tutor.phone,
  //         email: tutor.email,
  //         date_of_birth: tutor.date_of_birth,
  //         zip_code: tutor.zip_code,
  //         pets: formattedPets,
  //       });
  //     }
      
  //     return tutorWithPets;
  //     //return await this.tutorRepository.findAllTutors();
      
  //   } catch (error) {
  //     throw error;
  //   }

  // }


  