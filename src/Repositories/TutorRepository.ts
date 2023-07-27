import Tutors from "../Models/tutors";

export class TutorRepository {
  async createTutor(data: any) {
    try {
      return await Tutors.create(data);
    } catch (error) {
      throw error;
    }
  }

  async updateTutor(id: string, updatedData: any) {
    try {
      return await Tutors.findByIdAndUpdate(id, updatedData);
    } catch (error) {
      throw error;
    }
  }

  async findAllTutors() {
    try {
      return await Tutors.find();
    } catch (error) {
      throw error;
    }
  }

  async findTutorById(id: string) {
    try {
      return await Tutors.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteTutor(tutors_id: string) {
    try {
      return await Tutors.findByIdAndDelete(tutors_id);
    } catch (error) {
      throw error;
    }
  }
}
