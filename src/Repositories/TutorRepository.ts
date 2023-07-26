const Tutors = require('../models/tutors');

export class TutorRepository {
  async createTutor(data: any) {
    try {
      return await Tutors.create(data);
    } catch (error) {
      throw error;
    }
  }

  async updateTutor(tutors_id: string, updatedData: any) {
    try {
      return await Tutors.findByIdAndUpdate(tutors_id, updatedData, { new: true });
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

  async findTutorById(tutors_id: string) {
    try {
      return await Tutors.findById(tutors_id);
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
