// import tutors from "../Models/tutors";
// import  Pet  from '../Models/Pet';
// import { TutorRepository } from "../Repositories/TutorRepository";

// export class TutorService {
//   private tutorRepository: TutorRepository;

//   // Construtor da classe, onde é criada a instância do TutorRepository
//   constructor() {
//     this.tutorRepository = new TutorRepository();
//   }

//   // Método para criar um novo Tutor
//   async createTutor(data: any) {
//     try {
//       // Chama o método createTutor do TutorRepository para criar um novo Tutor com os dados fornecidos
//       return await this.tutorRepository.createTutor(data);
//     } catch (error) {
//       // Em caso de erro, lança o erro para ser tratado posteriormente
//       throw error;
//     }
//   }

//   // Método para atualizar um Tutor existente
//   async updateTutor(id: string, updatedData: any) {
//     try {
//       // Chama o método updateTutor do TutorRepository para atualizar o Tutor com o ID fornecido
//       return await this.tutorRepository.updateTutor(id, updatedData);
//     } catch (error) {
//       // Em caso de erro, lança o erro para ser tratado posteriormente
//       throw error;
//     }
//   }

//   // Método para obter todos os Tutores cadastrados
//   // async getTutors() {
//   //   try {
//   //     // Chama o método findAllTutors do TutorRepository para obter todos os Tutores cadastrados
//   //     return await this.tutorRepository.findAllTutors();
//   //   } catch (error) {
//   //     // Em caso de erro, lança o erro para ser tratado posteriormente
//   //     throw error;
//   //   }
//   // }

//   async getTutorWithPets() {
//     const tutors = await tutors.find();
//     const tutorWithPets = [];

//     for (const tutor of tutors) {
//       const pets = await Pet.find({ tutors: tutors._id });

//       const formattedPets = pets.map(
//         (pet: {
//           _id: any;
//           name: any;
//           species: any;
//           carry: any;
//           weight: any;
//           date_of_birth: any;
//         }) => ({
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
//   }
// }

//   // Método para obter um Tutor específico pelo ID
//   async getTutorById(tutors_id: string) {
//     try {
//       // Chama o método findTutorById do TutorRepository para obter o Tutor pelo ID fornecido
//       return await this.tutorRepository.findTutorById(tutors_id);
//     } catch (error) {
//       // Em caso de erro, lança o erro para ser tratado posteriormente
//       throw error;
//     }
//   }

//   // Método para deletar um Tutor pelo ID
//   async deleteTutor(tutors_id: string) {
//     try {
//       // Chama o método deleteTutor do TutorRepository para deletar o Tutor com o ID fornecido
//       return await this.tutorRepository.deleteTutor(tutors_id);
//     } catch (error) {
//       // Em caso de erro, lança o erro para ser tratado posteriormente
//       throw error;
//     }
//   }
// }

import TutorModel from "../Models/tutors";
import Pet from '../Models/pets';
import { TutorRepository } from "../Repositories/TutorRepository";
import pets from "../Models/pets";

export class TutorService {
  static getTutorWithPets() {
    throw new Error('Method not implemented.');
  }
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

  // Método para obter todos os Tutores cadastrados com seus Pets
  async getTutors() {
    const tutors = await TutorModel.find();
    const tutorWithPets = [];

    for (const tutor of tutors) {
      const pets = await Pet.find({ tutors: tutor._id });
      const formattedPets = pets.map(
        (pet: Partial<{
          _id: any;
          name: any;
          species: any;
          carry: any;
          weight: any;
          date_of_birth: any;
        }>) => ({
          id: pet._id,
          name: pet.name,
          species: pet.species,
          carry: pet.carry,
          weight: pet.weight,
          date_of_birth: pet.date_of_birth,
        }),
      );

      tutorWithPets.push({
        id: tutor._id,
        name: tutor.name,
        phone: tutor.phone,
        email: tutor.email,
        date_of_birth: tutor.date_of_birth,
        zip_code: tutor.zip_code,
        pets: formattedPets,
      });
    }

    return tutorWithPets;
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


