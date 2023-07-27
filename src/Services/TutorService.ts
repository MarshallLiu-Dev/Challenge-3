import { TutorRepository } from "../Repositories/TutorRepository";

export class TutorService {
  private tutorRepository: TutorRepository;

  constructor() {
    this.tutorRepository = new TutorRepository();
  }

  async createTutor(data: any) {
    try {
      return await this.tutorRepository.createTutor(data);
    } catch (error) {
      throw error;
    }
  }

  async updateTutor(id: string, updatedData: any) {
    try {
      return await this.tutorRepository.updateTutor(id, updatedData);
    } catch (error) {
      throw error;
    }
  }

  async getTutors() {
    try {
      return await this.tutorRepository.findAllTutors();
    } catch (error) {
      throw error;
    }
  }

  async getTutorById(tutors_id: string) {
    try {
      return await this.tutorRepository.findTutorById(tutors_id);
    } catch (error) {
      throw error;
    }
  }

  async deleteTutor(tutors_id: string) {
    try {
      return await this.tutorRepository.deleteTutor(tutors_id);
    } catch (error) {
      throw error;
    }
  }
}